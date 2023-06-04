<script lang="ts" setup="">
import Conversation from '~/components/chat/Conversation.vue'
import { useTeamStore } from '~/stores/team/team'
const store = useTeamStore()
</script>
<template>
  <div class="h-full">
    <Conversation
      v-if="store.conversationId"
      :conversation-id="store.conversationId"
      sender="team"
    />
  </div>
</template>
