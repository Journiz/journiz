<script lang="ts" setup>
import BasicMap from '~/components/BasicMap.vue'
import { useGeolocationStore } from '~/store/geolocation'

const location = useGeolocationStore()

const startWatchingPosition = () => {
  location.startWatching()
  location.startReporting()
}
/* const {data: team, update: updateTeam} = useTeam('bth1emonizvk3bh')

const updateTeamPosition = () => {
  if (team.value) {
    team.value.latitude = Math.random()
    team.value.longitude = Math.random()
    updateTeam()
  }
} */
</script>
<template>
  <ion-page class="bg-gray-300 flex flex-col items-center">
    <ion-header>
      <ion-toolbar>
        <ion-title>POC Geolocation</ion-title>
      </ion-toolbar>
    </ion-header>

    <p v-if="team">Equipe: {{ team.name }}</p>
    <BasicMap />
    <ion-button @click="startWatchingPosition"
      >Activer la localisation en background</ion-button
    >
  </ion-page>
</template>
