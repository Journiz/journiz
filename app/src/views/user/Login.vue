<script lang="ts" setup="">
import {
  createAnimation,
  IonInput,
  IonItem,
  IonLabel,
  IonSpinner,
  useIonRouter,
} from '@ionic/vue'
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'

const store = useUserStore()
const router = useIonRouter()

const email = ref('')
const password = ref('')
const error = ref()
const loading = ref(false)
const login = async () => {
  loading.value = true
  const success = await store.login(email.value, password.value)
  if (success) {
    return router.navigate('/user/home', 'root', 'replace')
  }
  error.value = 'Mot de passe incorrect.'
  loading.value = false
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
      <p v-if="error" class="text-red-500 p-2">{{ error }}</p>
      <ion-button :disabled="loading" @click="login">
        <ion-spinner v-if="loading" name="dots"></ion-spinner>
        <span v-else>Connexion</span>
      </ion-button>
    </IonContent>
  </IonPage>
</template>
