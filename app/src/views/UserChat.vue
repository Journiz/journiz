<script lang="ts" setup="">
import { useChat } from '@journiz/composables'
import { IonPage, IonHeader, IonContent } from '@ionic/vue'
import { ref } from 'vue'
import MessageBubble from '~/components/MessageBubble.vue'

const { conversation, sendMessage } = useChat('7i5bi3abxwsgks0', 'user')
const message = ref('')
const messageField = ref(null)
const messagesList = ref(null)
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
  if (messagesList.value) {
    messagesList.value.style.paddingBottom =
      event.target.offsetHeight + 16 + 'px'
  }
}
</script>
<template>
  <IonPage class="max-h-screen overflow-hidden flex flex-col">
    <IonHeader class="flex-initial">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="#">Retour</IonBackButton>
        </IonButtons>
        <IonTitle v-if="conversation">Chat {{ conversation.team }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="custom-container-height bg-blue-300">
      <div
        v-if="conversation"
        ref="messagesList"
        class="flex-1 custom-container-height overflow-scroll"
        style="padding-bottom: 60px"
      >
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
      <div class="flex fixed flex-auto pb-3 bottom-0 px-4 bg-white">
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
.custom-container-height {
  max-height: calc(100vh - 44px);
}
</style>
