<script lang="ts" setup="">
import { IonToolbar, IonBackButton, IonButtons } from '@ionic/vue'
import { useRoute } from 'vue-router'
import Conversation from '~/components/chat/Conversation.vue'

const route = useRoute()
const conversationId = route.params.conversationId as string
</script>
<template>
  <IonPage ref="page">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            text="Retour"
            default-href="/user/trip/chat"
            router-direction="back"
          ></IonBackButton>
        </IonButtons>
        <IonTitle>Conversation</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :scroll-x="false" :scroll-y="false">
      <Conversation :conversation-id="conversationId" sender="user" />
    </IonContent>
  </IonPage>
</template>
