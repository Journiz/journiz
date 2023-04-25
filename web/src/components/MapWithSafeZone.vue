<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { onMounted, PropType, ref } from 'vue'
// @ts-ignore
import { MapboxMap } from '@studiometa/vue-mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Map from '~/components/Map.vue'
import { Coordinates } from '~/types/Coordinates'
import SquareButton from '~/components/buttons/SquareButton.vue'
// @ts-ignore
const mapInstance = ref<MapboxMap>()
const emit = defineEmits(['safeAreaGeometry'])
let currentDrawId = ''
const draw = new MapboxDraw({
  displayControlsDefault: false,
  styles: [
    // ACTIVE (being drawn)
    // line stroke
    {
      id: 'gl-draw-line',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#D20C0C',
        'line-dasharray': [0.2, 2],
        'line-width': 2,
      },
    },
    // polygon fill
    {
      id: 'gl-draw-polygon-fill',
      type: 'fill',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      paint: {
        'fill-color': '#D20C0C',
        'fill-outline-color': '#D20C0C',
        'fill-opacity': 0.1,
      },
    },
    // polygon mid points
    {
      id: 'gl-draw-polygon-midpoint',
      type: 'circle',
      filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
      paint: {
        'circle-radius': 3,
        'circle-color': '#fbb03b',
      },
    },
    // polygon outline stroke
    // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
    {
      id: 'gl-draw-polygon-stroke-active',
      type: 'line',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#D20C0C',
        'line-dasharray': [0.2, 2],
        'line-width': 2,
      },
    },
    // vertex point halos
    {
      id: 'gl-draw-polygon-and-line-vertex-halo-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static'],
      ],
      paint: {
        'circle-radius': 5,
        'circle-color': '#FFF',
      },
    },
    // vertex points
    {
      id: 'gl-draw-polygon-and-line-vertex-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static'],
      ],
      paint: {
        'circle-radius': 3,
        'circle-color': '#D20C0C',
      },
    },

    // INACTIVE (static, already drawn)
    // line stroke
    {
      id: 'gl-draw-line-static',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#000',
        'line-width': 3,
      },
    },
    // polygon fill
    {
      id: 'gl-draw-polygon-fill-static',
      type: 'fill',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
      paint: {
        'fill-color': '#000',
        'fill-outline-color': '#000',
        'fill-opacity': 0.1,
      },
    },
    // polygon outline
    {
      id: 'gl-draw-polygon-stroke-static',
      type: 'line',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#000',
        'line-width': 3,
      },
    },
  ],
  defaultMode: 'draw_polygon',
})
defineProps({
  mapCenter: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
  zoom: {
    type: Number as PropType<number>,
    default: 10,
  },
})
const updateArea = (e) => {
  const data = draw.getAll()
  if (data.features[0]) {
    // @ts-expect-error Library wrong type
    currentDrawId = data.features[0].id
    // @ts-expect-error Library wrong type
    emit('safeAreaGeometry', data.features[0].geometry.coordinates[0])
  } else {
    emit('safeAreaGeometry', [])
  }
}
const trashDraw = () => {
  if (currentDrawId) {
    draw.delete(currentDrawId)
  }
}
onMounted(() => {
  mapInstance.value.addControl(draw, 'top-right')
  mapInstance.value.on('draw.create', updateArea)
  mapInstance.value.on('draw.delete', updateArea)
  mapInstance.value.on('draw.update', updateArea)
})
</script>
<template>
  <div class="relative">
    <SquareButton
      class="absolute right-4 top-4 z-10"
      icon="trash"
      @click="trashDraw"
    />
    <Map
      class="h-full"
      :map-center="mapCenter"
      :zoom="zoom"
      @getMap="(mapData) => (mapInstance = mapData)"
    >
      <slot />
    </Map>
  </div>
</template>
