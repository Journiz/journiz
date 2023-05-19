<script lang="ts" setup="">
import { computed, onMounted, ref, watch } from 'vue'
import { VoiceRecorder } from 'capacitor-voice-recorder'
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings'
import { useTimestamp } from '@vueuse/core'
import Button from '~/components/design-system/Button.vue'
import { base64ToArrayBuffer } from '~/utils/base64ToArrayBuffer'

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

const audioData = ref()

const samplesNum = 40
const emptySamples: number[] = []
for (let i = 0; i <= samplesNum; i++) {
  emptySamples.push(0)
}
const samples = ref(emptySamples)

const maxRecordingDuration = 3000

const isRecording = ref(false)
const timestamp = useTimestamp()
const startTime = ref(0)
const recordingDuration = computed(() => {
  return isRecording.value ? timestamp.value - startTime.value : 0
})
const startRecording = async () => {
  if (isRecording.value) {
    return
  }
  samples.value = emptySamples
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
    audioData.value = result.value.recordDataBase64
    samples.value = await computeSamples(result.value.recordDataBase64)
  }
}

const filterData = (audioBuffer: AudioBuffer) => {
  const rawData = audioBuffer.getChannelData(0) // We only need to work with one channel of data
  const samples = samplesNum // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples) // the number of samples in each subdivision
  const filteredData = []
  for (let i = 0; i < samples; i++) {
    const blockStart = blockSize * i // the location of the first sample in the block
    let sum = 0
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize) // divide the sum by the block size to get the average
  }
  return filteredData
}
const normalizeData = (filteredData: number[]) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1)
  return filteredData.map((n) => n * multiplier)
}

const computeSamples = async (base64Audio: string) => {
  const arrayBuffer = base64ToArrayBuffer(base64Audio)
  const audioContext = new AudioContext()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  const filteredData = filterData(audioBuffer)
  return normalizeData(filteredData)
}

watch(recordingDuration, (duration) => {
  if (duration > maxRecordingDuration) {
    stopRecording()
  }
})
</script>
<template>
  <div class="flex flex-col text-center">
    <h1 class="text-2xl font-black">Faites du bruit !</h1>
    <p class="text-sm">Enregistrez le cri de guerre de votre équipe !</p>
    <p v-if="refused" class="text-red mt-12 flex flex-col">
      Tu as refusé l'accès à ton micro, ton équipe ne pourra pas avoir de cri de
      guerre... C'est pas très fun.
      <Button color="green" class="mt-4" @click="openSettings"
        >Réglons ça !</Button
      >
    </p>
    <div v-else class="flex flex-col flex-grow justify-between mt-24 mb-8">
      <div class="p-4 bg-white shadow-lg rounded-xl">
        <div class="relative w-full h-8 flex">
          <button
            class="flex-shrink-0 text-red transition-all duration-200 transform"
            :class="audioData ? 'w-5 mr-3' : 'opacity-0 scale-0 w-0 mr-0'"
          >
            <span
              class="block text-20px i-fluent:triangle-right-32-filled"
            ></span>
          </button>
          <div class="flex-grow flex items-center justify-between">
            <div
              v-for="(sample, i) in samples"
              :key="i"
              class="rounded-full w-3px max-h-full min-h-3px transition-all duration-200"
              :class="
                audioData && !isRecording
                  ? 'bg-red'
                  : i / samplesNum < recordingDuration / maxRecordingDuration
                  ? 'bg-red'
                  : 'bg-gray-300'
              "
              :style="{
                height: sample * 100 + '%',
              }"
            ></div>
          </div>
        </div>
      </div>
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
    <Button class="w-full" :disabled="!refused && !audioData"
      >C'est parti !</Button
    >
  </div>
</template>
