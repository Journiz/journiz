<script lang="ts" setup="">
import { Camera, CameraResultType } from '@capacitor/camera'
import { ref } from 'vue'

const emit = defineEmits<{
  send: [data: { message: string; image?: string }]
  updateHeight: [height: number]
}>()

const attachingImage = ref<string>()
const message = ref('')

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 75,
    width: 1000,
    height: 1000,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    promptLabelHeader: "Choisir une source d'image",
    promptLabelPhoto: 'Choisir dans mes images',
    promptLabelPicture: 'Prendre une photo',
  })
  attachingImage.value = image.dataUrl
}

const onInputMessage = (event: Event) => {
  if (!event.target) return
  const target = event.target as HTMLTextAreaElement
  ;(target.parentNode as HTMLElement).dataset.replicatedValue = target.value
  emit('updateHeight', target.offsetHeight + 16)
}

const messageField = ref<HTMLElement>()
const send = () => {
  if (message.value !== '') {
    emit('send', { message: message.value, image: attachingImage.value })
    message.value = ''
    attachingImage.value = ''
    if (messageField.value?.parentNode) {
      ;(messageField.value.parentNode as HTMLElement).dataset.replicatedValue =
        message.value
    }
  }
}
</script>
<template>
  <div class="flex flex-col absolute bottom-0 backdrop-blur bg-white/40 z-11">
    <div v-if="attachingImage" class="p-4">
      <img :src="attachingImage" alt="Attachment" class="h-24 rounded-lg" />
    </div>
    <div class="flex px-4 flex-shrink-0 p-2">
      <button class="text-3xl mr-2" @click="takePicture">
        <span class="block i-uil:camera"></span>
      </button>
      <div class="grow-wrap">
        <textarea
          id="message"
          ref="messageField"
          v-model="message"
          name="message"
          placeholder="Écrire..."
          @input="onInputMessage"
        ></textarea>
      </div>
      <button class="send-btn bg-indigo-600 text-white" @click="send">
        Send
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Below code origin for textarea : https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ */
.grow-wrap {
  display: grid;
}

.grow-wrap::after {
  content: attr(data-replicated-value) ' ';
  white-space: pre-wrap;
  visibility: hidden;
  width: calc(100vw - 120px);
  max-width: calc(100vw - 120px);
  max-height: 90px;
  font-size: 16px;
  line-height: 16px;
}

.grow-wrap > textarea {
  resize: none;
  width: calc(100vw - 120px);
  max-width: calc(100vw - 120px);
  max-height: 90px;
  font-size: 16px;
  line-height: 16px;
  border-radius: 32px 0 0 32px;
}

.grow-wrap > textarea,
.grow-wrap::after {
  border: 1px solid black;
  padding: 0.5rem 1rem;
  grid-area: 1 / 1 / 2 / 2;
}

.send-btn {
  border-radius: 0 32px 32px 0;
  width: 52px;
}
</style>
