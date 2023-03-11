<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import {useGeolocation} from '#imports';
import { navigateCircleOutline, chevronUpCircle } from 'ionicons/icons';

const {currentLocation} = useGeolocation()
let map:MapboxMap = null

const recenterMapOnPosition = () => {
  map.setCenter([currentLocation.lng, currentLocation.lat])
}

</script>
<template>
  <MapboxMap
      class="w-full h-full absolute top-0 left-0"
      access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
      map-style="mapbox://styles/mapbox/streets-v12"
      :center="[-122.02703037000001, 37.330208800000001]"
      :zoom=14
      @mb-created="(mapInstance) => map = mapInstance" >
    <MapboxMarker :lng-lat="[currentLocation.lng, currentLocation.lat]">
      <p class="currentPosition-marker">
        <svg  width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="15" fill="#4770FF"/>
          <circle cx="20" cy="20" r="19.5" stroke="#87B7FF"/>
        </svg>
      </p>
    </MapboxMarker>
  </MapboxMap>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button><ion-icon :icon="chevronUpCircle"></ion-icon></ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button @click="recenterMapOnPosition"><ion-icon :icon="navigateCircleOutline"></ion-icon></ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>
<style scoped>
.currentPosition-marker svg {
  width: 20px;
  height: 20px;
}
</style>
