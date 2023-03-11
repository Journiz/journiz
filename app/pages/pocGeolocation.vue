<script lang="ts" setup>
import BasicMap from "~/components/BasicMap.vue";
import {useGeolocation, currentLocation} from "~/composables/useGeolocation";
import {reactive} from "vue";

const geolocation = useGeolocation()

const startWatchingPosition = () => {
  geolocation.startWatching()
}
</script>
<template>
<ion-page class="bg-gray-300 flex flex-col items-center">
  <ion-header>
    <ion-toolbar>
      <ion-title>POC Geolocation</ion-title>
    </ion-toolbar>
  </ion-header>
  <BasicMap :positionMarkerCoord="[currentLocation.lng, currentLocation.lat]" />
  <ion-button @click="startWatchingPosition">Activer la localisation en background</ion-button>
</ion-page>
</template>
