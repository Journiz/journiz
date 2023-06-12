<script lang="ts" setup="">
import { useRoute } from 'vue-router'
import Conversation from '~/components/chat/Conversation.vue'
import Page from '~/components/Page.vue'

const route = useRoute()
const conversationId = route.params.conversationId as string
</script>
<template>
  <Page>
    <Conversation :conversation-id="conversationId" sender="user" />
  </Page>
</template>
