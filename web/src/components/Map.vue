<script setup lang="ts">
import { PropType, ref, toRaw, watch } from 'vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// @ts-ignore
import { MapboxMap } from '@studiometa/vue-mapbox-gl'
import { Coordinates } from '~/types/Coordinates'
const emit = defineEmits(['getMap'])
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

const flyToPoint = (point: Coordinates, offset = [150, 0]) => {
  map.value.flyTo({
    center: point,
    offset,
    essential: true,
  })
}

const setMap = (mapInstance: MapboxMap) => {
  map.value = mapInstance
  emit('getMap', mapInstance)
}

defineExpose({
  flyToPoint,
})
</script>
<template>
  <MapboxMap
    ref="mapboxMap"
    class="w-full h-full"
    access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
    map-style="mapbox://styles/mapbox/streets-v12"
    :center="initialCenter"
    :zoom="zoom"
    @mb-created="setMap"
  >
    <slot />
  </MapboxMap>
</template>
