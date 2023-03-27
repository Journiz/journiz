<script lang="ts" setup="">
import { IonItem, IonLabel, IonInput } from '@ionic/vue'
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'

const pb = usePocketBase()

const email = ref('')
const password = ref('')
const login = async () => {
  await pb.collection('users').authWithPassword(email.value, password.value)
  console.log(pb.authStore.isValid)
}
</script>
<template>
  <IonPage>
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Se connecter</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input v-model="email" type="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Mot de passe</ion-label>
        <ion-input
          v-model="password"
          placeholder=""
          type="password"
        ></ion-input>
      </ion-item>
      <ion-button @click="login">Connexion</ion-button>
    </IonContent>
  </IonPage>
</template>
