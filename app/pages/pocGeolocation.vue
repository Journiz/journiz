<script lang="ts" setup>
import GeolocationV1 from "~/components/GeolocationV1.vue";
import BasicMap from "~/components/BasicMap.vue";
</script>
<template>
<ion-page class="bg-gray-300 flex flex-col items-center">
  <ion-header>
    <ion-toolbar>
      <ion-title>POC Geolocation</ion-title>
    </ion-toolbar>
  </ion-header>
  <BasicMap />
  <GeolocationV1 />
</ion-page>
</template>
