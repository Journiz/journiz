<script lang="ts" setup="">
import { IonItem } from '@ionic/vue'
import { useChat } from '@journiz/composables'
import { computed } from 'vue'
import { waitForEndLoading } from '~/utils/waitForEndLoading'
import TeamAvatar from '~/components/team/TeamAvatar.vue'
import { useUserStore } from '~/stores/user'
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
  if (message.sender === props.sender && !conversation.value.isBroadcast) {
    result = 'Vous: ' + result
  }
  return result
})
const lastMessageUnRead = computed(() => {
  return (
    lastMessage.value &&
    !lastMessage.value?.read &&
    lastMessage.value?.sender !== props.sender
  )
})
await waitForEndLoading(loading)

const store = useUserStore()
const teams = computed(() => store.trip?.expand?.teams.slice(0, 3) ?? [])
</script>
<template>
  <router-link
    class="text-green-dark"
    :to="{
      name: 'user-chat-conversation',
      params: {
        conversationId: conversation.id,
      },
    }"
  >
    <div class="flex py-3 pl-4 pr-6 items-center gap-2">
      <div
        v-if="conversation.isBroadcast"
        class="w-14 h-14 flex-shrink-0 relative mx-1"
      >
        <div
          v-for="team in teams"
          :key="team.id"
          class="avitem w-10 bg-beige flex items-center justify-center rounded-full"
        >
          <TeamAvatar class="w-8" :team="team" />
        </div>
      </div>
      <div
        v-else
        class="w-16 h-16 border border-beige rounded-full flex items-center justify-center flex-shrink-0 relative"
      >
        <TeamAvatar
          v-if="conversation.expand?.team"
          class="w-13"
          :team="conversation.expand?.team"
        />
        <div
          v-if="lastMessageUnRead"
          class="absolute bg-red top-1 left-1 w-4 h-4 rounded-full"
        ></div>
      </div>
      <div class="flex flex-col flex-grow-0 min-w-0">
        <span v-if="conversation.isBroadcast" class="font-bold"
          >Toutes les équipes</span
        >
        <span v-else class="font-bold">{{
          conversation.expand?.team?.name ?? 'Equipe inconnue'
        }}</span>
        <span
          class="block truncate min-w-0 max-w-full"
          :class="lastMessageUnRead ? 'font-medium' : 'font-light'"
          >{{ lastMessageContent ?? 'Aucun message' }}</span
        >
      </div>
    </div>
  </router-link>
</template>
<style scoped lang="scss">
.avitem {
  position: absolute;
  &:first-child {
    left: 0;
    top: 0;
  }
  &:nth-child(2) {
    left: 0;
    bottom: 0;
  }
  &:nth-child(3) {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
