<script lang="ts" setup="">
import { mask, polygon } from '@turf/turf'
// @ts-ignore
import { useMap } from '@studiometa/vue-mapbox-gl'
import { Map } from 'mapbox-gl'
import { Ref } from 'vue'
import { until } from '@vueuse/core'
const props = defineProps<{
  coords: number[][]
}>()
const poly = polygon([props.coords])
const worldMask = polygon([
  [
    [-180, -90],
    [180, -90],
    [180, 90],
    [-180, 90],
    [-180, -90],
  ],
])
const masked = mask(poly, worldMask)
const map = useMap().map as Ref<Map>
;(async () => {
  await until(map).not.toBe(undefined)
  map.value.addSource('safeZone-features', {
    type: 'geojson',
    data: masked,
  })
  map.value.addLayer({
    id: 'safeZone',
    type: 'fill',
    source: 'safeZone-features',
    layout: {},
    paint: {
      'fill-color': '#17403B', // blue color fill
      'fill-opacity': 0.15,
    },
  })
})()
</script>
<template>
  <slot></slot>
</template>
