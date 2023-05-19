<script lang="ts" setup="">
import { onMounted, ref } from 'vue'
import { VoiceRecorder } from 'capacitor-voice-recorder'
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings'
import Button from '~/components/design-system/Button.vue'

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
</script>
<template>
  <div class="flex flex-col text-center">
    <h1 class="text-2xl font-black">Je veux vous entendre crier !</h1>
    <p class="text-sm">Enregistrez le cri de guerre de votre équipe !</p>
    <p v-if="refused" class="text-red mt-12 flex flex-col">
      Tu as refusé l'accès à ton micro, ton équipe ne pourra pas avoir de cri de
      guerre... C'est pas très fun.
      <Button color="green" class="mt-4" @click="openSettings"
        >Réglons ça !</Button
      >
    </p>
  </div>
</template>
