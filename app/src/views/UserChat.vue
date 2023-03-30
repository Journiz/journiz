<script lang="ts" setup="">
import { useChat } from '@journiz/composables'
import { IonPage, IonHeader, IonContent } from '@ionic/vue'
import { ref } from 'vue'
import MessageBubble from '~/components/MessageBubble.vue'

const { conversation, sendMessage } = useChat('j92reqddn964eu3', 'user')
const message = ref('')
const messageField = ref(null)
const send = async () => {
  if (message.value !== '') {
    await sendMessage(message.value)
    message.value = ''
    if (messageField.value) {
      messageField.value.parentNode.dataset.replicatedValue = message.value
    }
  }
}

const onInputMessage = (event) => {
  // TODO Demander à Léo la meilleur méthode entre les 2 utilisées
  event.target.parentNode.dataset.replicatedValue = event.target.value
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
    <IonContent class="bg-blue-300">
      <div v-if="conversation">
        <MessageBubble
          v-for="message in conversation.expand.messages"
          :key="message.id"
          :message="message"
          user-type="user"
        />
      </div>
      <!-- <pre v-if="conversation">
        {{ conversation.expand.messages }}
      </pre> -->
      <div class="flex fixed bottom-3 px-4">
        <div class="grow-wrap">
          <textarea
            id="message"
            ref="messageField"
            v-model="message"
            name="message"
            placeholder="Écrire..."
            @input="onInputMessage"
          ></textarea>
        </div>
        <button class="send-btn bg-blue-600 text-white" @click="send">
          Send
        </button>
      </div>
    </IonContent>
  </IonPage>
</template>

<style>
/* Below code origin for textarea : https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ */
.grow-wrap {
  display: grid;
}
.grow-wrap::after {
  content: attr(data-replicated-value) ' ';
  white-space: pre-wrap;
  visibility: hidden;
  width: calc(100vw - 84px);
  max-width: calc(100vw - 84px);
  max-height: 90px;
  font-size: 16px;
  line-height: 16px;
}
.grow-wrap > textarea {
  resize: none;
  width: calc(100vw - 84px);
  max-width: calc(100vw - 84px);
  max-height: 90px;
  font-size: 16px;
  line-height: 16px;
  border-radius: 32px 0 0 32px;
}
.grow-wrap > textarea,
.grow-wrap::after {
  border: 1px solid black;
  padding: 0.5rem 1rem;
  grid-area: 1 / 1 / 2 / 2;
}
.send-btn {
  border-radius: 0 32px 32px 0;
  width: 52px;
}
</style>
