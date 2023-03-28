<script lang="ts" setup="">
import { useIonRouter } from '@ionic/vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const router = useIonRouter()
const logout = () => {
  userStore.logout()
  router.navigate('/home', 'root', 'replace')
  // router.replace('/user-login')
}
</script>
<template>
  <IonPage>
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Accueil user</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div>Bonjour {{ userStore.user?.username }}</div>
      <div>
        <IonButton @click="logout">Logout</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
