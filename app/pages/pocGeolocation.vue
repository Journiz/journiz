<script lang="ts" setup>
import BasicMap from "~/components/BasicMap.vue";
import {startWatching, stopWatching, currentLocation} from "~/components/useGeolocation";
</script>
<template>
<ion-page class="bg-gray-300 flex flex-col items-center">
  <ion-header>
    <ion-toolbar>
      <ion-title>POC Geolocation</ion-title>
    </ion-toolbar>
  </ion-header>
  <BasicMap :positionMarkerCoord="[currentLocation.long, currentLocation.lat]" />
  <ion-button @click="startWatching">Activer la localisation en background</ion-button>
</ion-page>
</template>
