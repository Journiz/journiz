<script lang="ts" setup="">
import { IonList, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { useConversations } from '@journiz/composables'
import { useEventListener } from '@vueuse/core'
import ConversationItem from '~/components/user/chat/ConversationItem.vue'
import { useUserStore } from '~/stores/user'

const {
  data: conversations,
  loading,
  refresh,
} = useConversations({
  filter: `team.trip="${useUserStore().trip?.id}"`,
})
useEventListener(document, 'visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    refresh()
  }
})
</script>
<template>
  <IonPage ref="page">
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Conversations</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <Suspense>
        <IonList v-if="conversations && !loading">
          <ConversationItem
            v-for="conversation in conversations"
            :key="conversation.id"
            :conversation="conversation.id"
            sender="user"
          />
        </IonList>
        <template #fallback>Chargement...</template>
      </Suspense>
    </IonContent>
  </IonPage>
</template>
