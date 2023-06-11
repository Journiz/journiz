<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import Button from '~/components/design-system/Button.vue'

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
const getPhoto = async (gallery = false) => {
  const image = await Camera.getPhoto({
    ...photoParams,
    source: gallery ? CameraSource.Photos : CameraSource.Camera,
  })
  if (image.dataUrl) {
    emit('answer', image.dataUrl)
  }
}
</script>
<template>
  <div class="flex flex-col">
    <Button color="theme" class="mb-2" @click="getPhoto">
      Prendre une photo
    </Button>
    <Button color="green" class="" @click="getPhoto(true)"> Galerie</Button>
  </div>
</template>
