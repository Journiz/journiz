<script setup lang="ts">
import { useTimestamp } from '@vueuse/core'
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings'
import { VoiceRecorder } from 'capacitor-voice-recorder'
import { computed, onMounted, ref, watch } from 'vue'
import Button from '../design-system/Button.vue'
import AudioPlayer from '~/components/audio/AudioPlayer.vue'

const props = defineProps({
  noPermissionMessage: {
    type: String,
    default:
      "Tu as refusé l'accès à ton micro, ton équipe ne pourra pas avoir de cri de guerre... C'est pas très fun.",
  },
  maxDuration: {
    type: Number,
    default: 3000,
  },
})
const audioData = defineModel<string>()

const refused = ref(false)
const openSettings = () => {
  NativeSettings.open({
    optionIOS: IOSSettings.App,
    optionAndroid: AndroidSettings.Application,
  })
}
onMounted(async () => {
  if (!(await VoiceRecorder.hasAudioRecordingPermission()).value) {
    const result = await VoiceRecorder.requestAudioRecordingPermission()
    if (!result.value) {
      refused.value = true
    }
  }
})

const isRecording = ref(false)
const timestamp = useTimestamp()
const startTime = ref(0)
const recordingDuration = computed(() => {
  return isRecording.value ? timestamp.value - startTime.value : 0
})
const recordingProgress = computed(() => {
  return isRecording.value ? recordingDuration.value / props.maxDuration : 0
})
const startRecording = async () => {
  if (isRecording.value) {
    return
  }
  audioData.value = ''
  isRecording.value = true
  startTime.value = timestamp.value
  await VoiceRecorder.startRecording()
}

const stopRecording = async () => {
  if (!isRecording.value) {
    return
  }
  const duration = recordingDuration.value
  isRecording.value = false
  const result = await VoiceRecorder.stopRecording()
  if (duration > 400) {
    audioData.value = `data:${result.value.mimeType};base64,${result.value.recordDataBase64}`
  }
}
watch(recordingDuration, (duration) => {
  if (duration > props.maxDuration) {
    stopRecording()
  }
})
</script>
<template>
  <div class="relative">
    <p v-if="refused" class="text-red mt-12 flex flex-col">
      {{ noPermissionMessage }}
      <Button color="green" class="mt-4" @click="openSettings"
        >Réglons ça !
      </Button>
    </p>
    <div v-else class="flex flex-col justify-between h-full">
      <AudioPlayer
        :audio-data="audioData"
        :recording-progress="recordingProgress"
      />
      <div class="flex items-center flex-col gap-6">
        <button
          class="btn-animation select-none"
          @touchstart="startRecording"
          @touchend="stopRecording"
        >
          <span
            class="text-white w-20 h-20 flex items-center justify-center rounded-full transition duration-150"
            :class="isRecording ? 'bg-red' : 'bg-green'"
          >
            <span class="i-uil:microphone block text-32px"></span>
          </span>
        </button>
        <span class="italic font-light text-sm"
          >Maintenir pour enregistrer</span
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.playpause-enter-active,
.playpause-leave-active {
  @apply transition duration-150 ease-in-quad;
}

.playpause-enter-active {
  @apply ease-out-quad;
}

.playpause-enter-from,
.playpause-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
