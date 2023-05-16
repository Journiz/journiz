<script lang="ts" setup="">
import { useTeamStore } from '~/stores/team/team'
import { useLogout } from '~/composables/useLogout'
import { useGeolocationStore } from '~/stores/geolocation'
import Page from '~/components/Page.vue'

const store = useTeamStore()
const location = useGeolocationStore()
const startWatchingPosition = () => {
  location.startWatching()
  location.startReporting()
}

const logout = useLogout(store.logout)
</script>
<template>
  <Page>
    <div v-if="store.team">Bonjour {{ store.team.name }}</div>
    <div>
      <IonButton :router-link="{ name: 'team-customize' }">Custom</IonButton>
      <IonButton @click="startWatchingPosition">Start track</IonButton>
      <IonButton router-link="/team/chat">Chat</IonButton>
      <IonButton @click="logout">Logout</IonButton>
    </div>
  </Page>
</template>
