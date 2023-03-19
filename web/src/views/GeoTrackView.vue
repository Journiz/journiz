<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'
// @ts-ignore
import { MapboxMap, MapboxSource, MapboxLayer } from '@studiometa/vue-mapbox-gl'
import { useRealtimeTeam } from '@journiz/composables'
import { useStorage } from '@vueuse/core'
import { watch } from 'vue'

const team = useRealtimeTeam('bth1emonizvk3bh')
const points = useStorage('poc-geo-points', [[6.114789, 45.91]])
const clear = () => {
  points.value = []
}

watch(
  team.data,
  (newVal) => {
    if (!newVal) return
    const coords = [newVal.longitude, newVal.latitude]
    const isNewPoint =
      JSON.stringify(coords) !== JSON.stringify(points.value.at(-1))
    console.log(isNewPoint)
    if (isNewPoint) {
      points.value.push(coords)
    }
  },
  { deep: true }
)
</script>

<template>
  <main>
    <div class="w-full h-[90vh] relative">
      <MapboxMap
        class="w-full h-full"
        access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
        map-style="mapbox://styles/mapbox/streets-v12"
        :center="[6.114789, 45.91]"
        :zoom="14"
      >
        <MapboxSource
          id="line"
          :options="{
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: points,
                  },
                },
              ],
            },
          }"
        ></MapboxSource>
        <MapboxLayer
          id="line-animation"
          :options="{
            id: 'line-animation',
            type: 'line',
            source: 'line',
            layout: {
              'line-cap': 'round',
              'line-join': 'round',
            },
            paint: {
              'line-color': '#ed6498',
              'line-width': 5,
              'line-opacity': 0.8,
            },
          }"
        ></MapboxLayer>
      </MapboxMap>
    </div>
  </main>
</template>
