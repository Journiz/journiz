<script lang="ts" setup="">
import { IonToolbar } from '@ionic/vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { conversationId } = route.params
</script>
<template>
  <IonPage ref="page">
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Conversations</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true"
      >Conversation {{ conversationId }}</IonContent
    >
  </IonPage>
</template>
