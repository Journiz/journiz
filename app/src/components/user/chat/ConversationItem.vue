<script lang="ts" setup="">
import { IonItem } from '@ionic/vue'
import { useChat } from '@journiz/composables'
import { computed } from 'vue'
import { waitForEndLoading } from '~/utils/waitForEndLoading'
const props = defineProps<{
  conversation: string
  sender: 'user' | 'team'
}>()
const { conversation, loading } = useChat(props.conversation, props.sender)

const lastMessage = computed(() => {
  return conversation.value?.expand?.messages?.at(-1)
})
const lastMessageContent = computed(() => {
  const message = lastMessage.value
  if (!message) return null
  let result = message.content
  if (message.sender === props.sender) {
    result = 'Vous: ' + result
  }
  return result
})
const lastMessageUnRead = computed(() => {
  return !lastMessage.value?.read && lastMessage.value?.sender !== props.sender
})
await waitForEndLoading(loading)
</script>
<template>
  <IonItem button :router-link="`/user/trip/chat/${conversation.id}`">
    <div class="flex flex-col py-2">
      <span class="font-bold text-blue-500">{{
        conversation.expand?.team?.name ?? 'Equipe inconnue'
      }}</span>
      <span class="text-sm" :class="{ 'font-bold': lastMessageUnRead }">{{
        lastMessageContent
      }}</span>
    </div>
  </IonItem>
</template>
