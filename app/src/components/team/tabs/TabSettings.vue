<script lang="ts" setup="">
import { useTeamStore } from '~/stores/team/team'
import { useGeolocationStore } from '~/stores/geolocation'
import { useLogout } from '~/composables/useLogout'
import Header from '~/components/design-system/Header.vue'

const store = useTeamStore()
const location = useGeolocationStore()
const startWatchingPosition = () => {
  location.startWatching()
  location.startReporting()
}

const logout = useLogout(store.logout)
</script>
<template>
  <div v-if="store.team" class="flex flex-col h-full">
    <Header :subtitle="store.team.name" title="Paramètres" />
    <div class="flex-grow bg-beige">
      Bonjour {{ store.team.name }}
      <IonButton :router-link="{ name: 'team-customize' }">Custom</IonButton>
      <IonButton @click="startWatchingPosition">Start track</IonButton>
      <IonButton router-link="/team/chat">Chat</IonButton>
      <IonButton @click="logout">Logout</IonButton>
    </div>
  </div>
</template>
