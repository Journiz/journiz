<script lang="ts" setup="">
import Conversation from '~/components/chat/Conversation.vue'
import Page from '~/components/Page.vue'
import { useTeamStore } from '~/stores/team/team'

const store = useTeamStore()
</script>
<template>
  <Page>
    <Conversation
      v-if="store.conversationId"
      :conversation-id="store.conversationId"
      sender="team"
    />
  </Page>
</template>
