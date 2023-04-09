<script lang="ts" setup="">
import { useTeamStore } from '~/stores/team/team'
import { useLogout } from '~/composables/useLogout'

const store = useTeamStore()

const logout = useLogout(store.logout)
</script>
<template>
  <IonPage>
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Accueil team</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div v-if="store.team">Bonjour {{ store.team.name }}</div>
      <div>
        <IonButton router-link="/team/chat">Chat</IonButton>
        <IonButton @click="logout">Logout</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
