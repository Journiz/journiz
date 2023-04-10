<script lang="ts" setup="">
import { useChat } from '@journiz/composables'
import { computed, nextTick, ref, watch } from 'vue'
import MessageBubble from '~/components/chat/MessageBubble.vue'

const props = defineProps<{
  conversationId: string
  sender: 'team' | 'user'
}>()

const { conversation, sendMessage, markAsRead } = useChat(
  props.conversationId,
  props.sender
)
const message = ref('')
const messageField = ref<HTMLElement>()
const messagesList = ref<HTMLElement>()
const send = async () => {
  if (message.value !== '') {
    await sendMessage(message.value)
    message.value = ''
    if (messageField.value?.parentNode) {
      ;(messageField.value.parentNode as HTMLElement).dataset.replicatedValue =
        message.value
    }
  }
}

const onInputMessage = (event: Event) => {
  // TODO Demander à Léo la meilleur méthode entre les 2 utilisées
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
</script>
<template>
  <div class="flex flex-col h-full relative">
    <div
      v-if="conversation"
      ref="messagesList"
      class="flex-grow overflow-y-scroll overflow-x-hidden pb-16"
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
    <div v-else class="flex-grow">
      Chargement conversation {{ conversationId }}...
    </div>
    <div
      class="absolute bottom-0 flex px-4 flex-shrink-0 p-2 backdrop-blur bg-white/40"
    >
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
      <button class="send-btn bg-blue-600 text-white" @click="send">
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
  width: calc(100vw - 84px);
  max-width: calc(100vw - 84px);
  max-height: 90px;
  font-size: 16px;
  line-height: 16px;
}

.grow-wrap > textarea {
  resize: none;
  width: calc(100vw - 84px);
  max-width: calc(100vw - 84px);
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
