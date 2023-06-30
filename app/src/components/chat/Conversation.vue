<script lang="ts" setup="">
import { useChat } from '@journiz/composables'
import { computed, ref } from 'vue'
import dataURItoBlob from '~/utils/dataURIToBlob'
import Header from '~/components/design-system/Header.vue'
import Messages from '~/components/chat/Messages.vue'
import ChatInput from '~/components/chat/ChatInput.vue'

const props = defineProps<{
  conversationId: string
  sender: 'team' | 'user'
}>()

const { conversation, sendMessage, markAsRead, loading } = useChat(
  props.conversationId,
  props.sender
)

const messages = computed(() => {
  return conversation.value?.expand?.messages ?? []
})

const sending = ref(false)
const send = async (data: { message: string; image?: string }) => {
  sending.value = true
  let image
  if (data.image) {
    image = dataURItoBlob(data.image)
  }
  await sendMessage(data.message, image)
  sending.value = false
}

const recipient = computed(() => {
  return props.sender === 'team'
    ? 'Prof'
    : conversation.value?.expand?.team?.name ?? 'Chat'
})

const chatHeight = ref<number>()
</script>
<template>
  <div class="flex flex-col h-full relative bg-beige-light">
    <Header
      v-if="recipient"
      :title="recipient"
      subtitle=""
      :back-to="{
        name: sender === 'team' ? 'team' : 'user-trip-tabs',
        query: { tab: 'chat' },
      }"
    />
    <p
      v-if="messages.length > 0 && conversation?.isBroadcast"
      class="font-light text-sm px-12 text-center py-4 text-green"
    >
      Les messages envoyés ici seront visibles par toutes les équipes.
      Rendez-vous dans la conversation de chaque équipe pour voir leur réponse.
    </p>
    <Messages
      :messages="messages"
      :loading="loading"
      :sender="sender"
      :style="{
        paddingBottom: chatHeight ? chatHeight + 'px' : '96px',
      }"
      @message-read="markAsRead"
    />
    <ChatInput
      :sending="sending"
      @send="send"
      @update-height="chatHeight = $event"
    />
  </div>
</template>
