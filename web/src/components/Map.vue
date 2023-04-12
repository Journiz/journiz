<script setup lang="ts">
import { PropType, ref, toRaw, watch } from 'vue'
import 'mapbox-gl/dist/mapbox-gl.css'
// @ts-ignore
import { MapboxMap } from '@studiometa/vue-mapbox-gl'
import { Coordinates } from '~/types/Coordinates'
const props = defineProps({
  mapCenter: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
  zoom: {
    type: Number as PropType<number>,
    default: 10,
  },
})

const initialCenter = toRaw(props.mapCenter)
const map = ref<MapboxMap>()

watch(
  () => props.mapCenter,
  (newCenter) => {
    map.value?.setCenter(newCenter)
  }
)
</script>
<template>
  <MapboxMap
    class="w-full h-full"
    access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
    map-style="mapbox://styles/mapbox/streets-v12"
    :center="initialCenter"
    :zoom="zoom"
    @mb-created="(mapInstance: MapboxMap) => (map = mapInstance)"
  >
    <slot />
  </MapboxMap>
</template>
