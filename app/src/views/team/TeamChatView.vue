<script lang="ts" setup="">
import { IonToolbar } from '@ionic/vue'
import Conversation from '~/components/chat/Conversation.vue'
import { useTeamStore } from '~/stores/team/team'
const store = useTeamStore()
</script>
<template>
  <IonPage ref="page" :scroll-x="false" :scroll-y="false">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Conversations</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <Conversation
        v-if="store.conversationId"
        :conversation-id="store.conversationId"
        sender="team"
      />
    </IonContent>
  </IonPage>
</template>
