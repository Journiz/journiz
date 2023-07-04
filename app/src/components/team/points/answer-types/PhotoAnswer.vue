<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { watch } from 'vue'
import { loadingController } from '@ionic/vue'
import Button from '~/components/design-system/Button.vue'
import dataURItoBlob from '~/utils/dataURIToBlob'
import useTeamAnswer from '~/composables/useTeamAnswer'

const props = defineProps<{
  point: Point
}>()
const emit = defineEmits<{
  answer: [data: string]
}>()

const photoParams = {
  quality: 75,
  width: 1000,
  height: 1000,
  allowEditing: false,
  resultType: CameraResultType.DataUrl,
}
const { sendAnswer, loading } = useTeamAnswer(props.point, false, true)
const getPhoto = async (gallery = false) => {
  const image = await Camera.getPhoto({
    ...photoParams,
    source: gallery ? CameraSource.Photos : CameraSource.Camera,
  })
  if (image.dataUrl) {
    await sendAnswer(image.dataUrl, true)
  }
}
let loadingIndicator: HTMLIonLoadingElement
loadingController
  .create({
    message: "Envoi de l'image...",
  })
  .then((indicator) => {
    loadingIndicator = indicator
  })
watch(loading, (isLoading) => {
  if (isLoading) {
    loadingIndicator?.present()
  } else {
    loadingIndicator?.dismiss()
  }
})
</script>
<template>
  <div class="flex flex-col">
    <Button color="theme" class="mb-2" @click="getPhoto(false)">
      Prendre une photo
    </Button>
    <Button color="theme" @click="getPhoto(true)"> Galerie</Button>
  </div>
</template>
