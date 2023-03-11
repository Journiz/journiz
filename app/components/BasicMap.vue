<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import {useGeolocation} from '#imports';

const {currentLocation} = useGeolocation()
let map:MapboxMap = null

</script>
<template>
  <MapboxMap
      class="w-full h-full absolute top-0 left-0"
      access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
      map-style="mapbox://styles/mapbox/streets-v12"
      :center="[-122.02703037000001, 37.330208800000001]"
      :zoom=14
      @mb-created="(mapInstance) => map = mapInstance" >
    <MapboxMarker :lng-lat="[currentLocation.lng, currentLocation.lat]" />
  </MapboxMap>
</template>
<style scoped>
</style>
