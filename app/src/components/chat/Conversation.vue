<script lang="ts" setup="">
import { useChat } from '@journiz/composables'
import { computed, nextTick, ref, watch } from 'vue'
import { Camera, CameraResultType } from '@capacitor/camera'
import MessageBubble from '~/components/chat/MessageBubble.vue'
import dataURItoBlob from '~/utils/dataURIToBlob'
import Header from '~/components/design-system/Header.vue'

const props = defineProps<{
  conversationId: string
  sender: 'team' | 'user'
}>()

const { conversation, sendMessage, markAsRead } = useChat(
  props.conversationId,
  props.sender
)

const attachingImageUrl = ref<string>()
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
  attachingImageUrl.value = image.dataUrl
}

const message = ref('')
const messageField = ref<HTMLElement>()
const messagesList = ref<HTMLElement>()
const send = async () => {
  if (message.value !== '') {
    let image
    if (attachingImageUrl.value) {
      image = dataURItoBlob(attachingImageUrl.value)
    }
    await sendMessage(message.value, image)
    message.value = ''
    attachingImageUrl.value = ''
    if (messageField.value?.parentNode) {
      ;(messageField.value.parentNode as HTMLElement).dataset.replicatedValue =
        message.value
    }
  }
}

const onInputMessage = (event: Event) => {
  if (!event.target) return
  const target = event.target as HTMLTextAreaElement
  ;(target.parentNode as HTMLElement).dataset.replicatedValue = target.value
  if (messagesList.value) {
    messagesList.value.style.paddingBottom = target.offsetHeight + 16 + 'px'
  }
}

const messages = computed(() => {
  return conversation.value?.expand?.messages ?? []
})

const scrollToBottom = async (animated = true) => {
  await nextTick()
  if (messagesList.value) {
    messagesList.value.scrollTo({
      top: messagesList.value.scrollHeight - messagesList.value.offsetHeight,
      behavior: animated ? 'smooth' : 'auto',
    })
  }
}

let isFirst = true
watch(messages, () => {
  if (isFirst) {
    isFirst = false
    scrollToBottom(false)
    return
  }
  scrollToBottom()
})

const recipient = computed(() => {
  return props.sender === 'team'
    ? 'Prof'
    : conversation.value?.expand?.team.name
})
</script>
<template>
  <div class="flex flex-col h-full relative">
    <Header
      v-if="recipient"
      :title="recipient"
      subtitle=""
      :back-to="{
        name: sender === 'team' ? 'team' : 'user-trip-tabs',
        query: { tab: 'chat' },
      }"
    />
    <div
      v-if="conversation"
      ref="messagesList"
      class="flex-grow overflow-y-scroll overflow-x-hidden pb-24"
    >
      <transition-group name="message-list">
        <MessageBubble
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :user-type="sender"
          @message-read="markAsRead(message.id)"
        />
      </transition-group>
    </div>
    <div v-else class="flex-grow">Chargement du chat...</div>
    <div class="flex flex-col absolute bottom-0 backdrop-blur bg-white/40 z-11">
      <div v-if="attachingImageUrl" class="p-4">
        <img
          :src="attachingImageUrl"
          alt="Attachment"
          class="h-24 rounded-lg"
        />
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

.message-list-enter-active {
  transition: all 0.2s;
}

.message-list-enter-from {
  opacity: 0;
}
</style>
