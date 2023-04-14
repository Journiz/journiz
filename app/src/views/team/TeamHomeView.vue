<script lang="ts" setup="">
import { useTeamStore } from '~/stores/team/team'
import { useLogout } from '~/composables/useLogout'
import { useGeolocationStore } from '~/stores/geolocation'

const store = useTeamStore()
const location = useGeolocationStore()
const startWatchingPosition = () => {
  location.startWatching()
  location.startReporting()
}

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
        <IonButton @click="startWatchingPosition">Start track</IonButton>
        <IonButton router-link="/team/chat">Chat</IonButton>
        <IonButton @click="logout">Logout</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
