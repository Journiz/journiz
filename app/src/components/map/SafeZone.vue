<script lang="ts" setup="">
// @ts-ignore
import { useMap } from '@studiometa/vue-mapbox-gl'
import { Map } from 'mapbox-gl'
import { Ref } from 'vue'
import { until } from '@vueuse/core'

const map = useMap().map as Ref<Map>
;(async () => {
  await until(map).not.toBe(undefined)
  console.log(map.value)
  map.value.addSource('safeZone-features', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        // These coordinates outline Maine.
        coordinates: [
          [
            [6.085894869204992, 45.90934038433079],
            [6.098633502697879, 45.89654856284852],
            [6.119918308026257, 45.900700617444414],
            [6.126368249035522, 45.91180864218239],
            [6.1071796745346205, 45.9208953727784],
            [6.085249875104296, 45.914501161925216],
            [6.085894869204992, 45.90934038433079],
          ],
        ],
      },
    },
  })
  map.value.addLayer({
    id: 'safeZone',
    type: 'fill',
    source: 'safeZone-features',
    layout: {},
    paint: {
      'fill-color': '#0080ff', // blue color fill
      'fill-opacity': 0.5,
    },
  })
})()
</script>
<template>
  <slot></slot>
</template>
