<script lang="ts" setup="">
import { Message } from '@journiz/api-types'
import { nextTick, ref, watch } from 'vue'
import MessageBubble from '~/components/chat/MessageBubble.vue'

const props = defineProps<{
  messages: Message[]
  sender: 'team' | 'user'
  loading?: boolean
}>()
const emit = defineEmits(['message-read'])

const messagesList = ref<HTMLElement>()
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
watch(
  () => props.messages,
  () => {
    if (isFirst) {
      isFirst = false
      scrollToBottom(false)
      return
    }
    scrollToBottom()
  }
)
</script>
<template>
  <div ref="messagesList" class="flex-grow overflow-y-scroll overflow-x-hidden">
    <transition-group v-if="messages?.length" name="message-list">
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :user-type="sender"
        @message-read="emit('message-read', message.id)"
      />
    </transition-group>
    <div v-else-if="loading" class="flex-grow">Chargement du chat...</div>
    <div
      v-else
      class="flex-grow text-center font-light mx-auto w-2/3 mt-6 text-sm"
    >
      Pas de messages. Pourquoi ne pas engager la conversation ?
    </div>
  </div>
</template>
<style scoped>
.message-list-enter-active {
  transition: all 0.2s;
}

.message-list-enter-from {
  opacity: 0;
}
</style>
