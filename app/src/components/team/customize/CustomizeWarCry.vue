<script lang="ts" setup="">
import { getFileUrl, usePocketBase } from '@journiz/composables'
import { onBeforeMount, ref } from 'vue'
import Button from '~/components/design-system/Button.vue'
import { useTeamStore } from '~/stores/team/team'
import dataURItoBlob from '~/utils/dataURIToBlob'
import fetchAsBase64 from '~/utils/fetchAsBase64'
import AudioRecorder from '~/components/audio/AudioRecorder.vue'

const store = useTeamStore()
const audioData = ref()

const pb = usePocketBase()
const confirm = async () => {
  if (!audioData.value) return
  const blob = dataURItoBlob(audioData.value)
  const data = new FormData()
  data.append('warCry', blob)
  const result = await pb.collection('team').update(store.team!.id, data)
  console.log(result)
}

const warCryUrl = getFileUrl(store.team, store.team?.warCry)
onBeforeMount(async () => {
  if (warCryUrl) {
    const data = (await fetchAsBase64(warCryUrl)) as string
    audioData.value = data
  }
})
</script>
<template>
  <div class="flex flex-col text-center">
    <h1 class="text-2xl font-black">Faites du bruit !</h1>
    <p class="text-sm">Enregistrez le cri de guerre de votre équipe !</p>
    <AudioRecorder
      v-model="audioData"
      class="flex-grow justify-between mt-24 mb-8"
    ></AudioRecorder>
    <Button class="w-full" :disabled="!audioData" @click="confirm"
      >C'est parti !</Button
    >
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
