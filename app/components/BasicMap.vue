<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
// let positionMarkerCoord = [6.129384, 45.899247]
defineProps(['positionMarkerCoord'])

</script>
<template>
  <MapboxMap
      class="w-full h-full absolute top-0 left-0"
      access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
      map-style="mapbox://styles/mapbox/streets-v12"
      :center="[-122.02703037000001, 37.330208800000001]"
      :zoom=14>
    <MapboxMarker :lng-lat="positionMarkerCoord" />
  </MapboxMap>

</template>
<style scoped>
</style>
