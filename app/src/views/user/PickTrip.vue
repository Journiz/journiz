<script lang="ts" setup="">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
</script>
<template>
  <IonPage>
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Choisir un parcours</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div>Bonjour {{ userStore.user?.username }}</div>
      <div>
        <IonButton @click="userStore.logout()">Logout</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
