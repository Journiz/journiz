<script lang="ts" setup>
import BasicMap from '~/components/BasicMap.vue'
import { useGeolocationStore } from '~/store/geolocation'
import { useTeamStore } from '~/store/team'

const location = useGeolocationStore()

const startWatchingPosition = () => {
  location.startWatching()
  location.startReporting()
}

const teamStore = useTeamStore()
teamStore.setId('bth1emonizvk3bh')
</script>
<template>
  <ion-page class="bg-gray-300 flex flex-col items-center">
    <ion-header>
      <ion-toolbar>
        <ion-title>POC Geolocation</ion-title>
      </ion-toolbar>
    </ion-header>

    <p v-if="teamStore.team">Equipe: {{ teamStore.team.name }}</p>
    <BasicMap />
    <ion-button @click="startWatchingPosition"
      >Activer la localisation en background</ion-button
    >
  </ion-page>
</template>
