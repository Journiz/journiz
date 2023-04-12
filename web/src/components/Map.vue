<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
// @ts-ignore
import { MapboxMap } from '@studiometa/vue-mapbox-gl'
const props = defineProps<{
  mapCenter: number[]
}>()

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
    map-style="mapbox://styles/journiz/clgcotbx4002b01p2qffjcvv1"
    :center="initialCenter"
    :zoom="10"
    @mb-created="(mapInstance: MapboxMap) => (map = mapInstance)"
  />
</template>
