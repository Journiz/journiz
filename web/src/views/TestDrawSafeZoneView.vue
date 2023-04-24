<script setup>
import MapWithSafeZone from '~/components/MapWithSafeZone.vue'
const sendGeometryToServer = (geometry) => {
  // TODO Send log data on server
  console.log('🛫 Data to send to server as "safeZone" : ')
  console.log(geometry)
}
</script>
<template>
  <MapWithSafeZone
    class="h-screen"
    :map-center="[6.129384, 45.899247]"
    @safeAreaGeometry="sendGeometryToServer"
  ></MapWithSafeZone>
</template>
