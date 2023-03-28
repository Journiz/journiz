<script lang="ts" setup="">
import { useChat } from '@journiz/composables'
import { IonPage, IonHeader, IonContent } from '@ionic/vue'
import { ref } from 'vue'

const { conversation, sendMessage } = useChat('j92reqddn964eu3', 'user')
const message = ref('')
const send = async () => {
  await sendMessage(message.value)
  message.value = ''
}
</script>
<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="#">Retour</IonBackButton>
        </IonButtons>
        <IonTitle>Chat</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <pre v-if="conversation">
        {{ conversation.expand?.messages }}
      </pre>
      <div>
        <input v-model="message" type="text" />
        <button class="bg-red-200" @click="send">Send</button>
      </div>
    </IonContent>
  </IonPage>
</template>
