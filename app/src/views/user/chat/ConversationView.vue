<script lang="ts" setup="">
import { IonToolbar } from '@ionic/vue'
import { useRoute } from 'vue-router'
import Conversation from '~/components/chat/Conversation.vue'

const route = useRoute()
const conversationId = route.params.conversationId as string
</script>
<template>
  <IonPage ref="page" :scroll-x="false" :scroll-y="false">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Conversations</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <Conversation :conversation-id="conversationId" sender="user" />
    </IonContent>
  </IonPage>
</template>
