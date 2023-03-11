<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import {reactive} from "vue";
import {useGeolocation} from '#imports';
// let positionMarkerCoord = [6.129384, 45.899247]

const {currentLocation} = useGeolocation()

let currentCenter = reactive({lng: -122.02703037000001, lat: 37.330208800000001})
let map:MapboxMap = null

// Var to use to see the expected behaviour
let testLocation = reactive({lng: -122.02703037000001, lat: 37.330208800000001})

onMounted(() => {
  map.on('drag', () => {
    // Catch new position of center after dragging
    // currentCenter = map.getCenter()
  });
})

const changeMarkerPos = () => {
  testLocation.lng += 1
}

</script>
<template>
  <MapboxMap
      class="w-full h-full absolute top-0 left-0"
      access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
      map-style="mapbox://styles/mapbox/streets-v12"
      :center="[currentCenter.lng, currentCenter.lat]"
      :zoom=14
      @mb-created="(mapInstance) => map = mapInstance" >
    <MapboxMarker :lng-lat="[currentLocation.lng, currentLocation.lat]" />
  </MapboxMap>
  <ion-button @click="changeMarkerPos">Change marker position</ion-button>
</template>
<style scoped>
</style>
