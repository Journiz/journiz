<script setup lang="ts">
import { PropType } from 'vue'
import Map from '~/components/Map.vue'
import { Coordinates } from '~/types/Coordinates'
import MapMarker from '~/components/MapMarker.vue'
import SearchBar from '~/components/SearchBar.vue'
import Geocoding from '~/components/Geocoding.vue'

const searchMarkers: MapMarker[] = null

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
</script>
<template>
  <div class="relative">
    <Geocoding class="absolute left-4 top-4 z-1 w-2/5" />
    <Map :map-center="mapCenter" :zoom="zoom" class="w-full h-full">
      <slot />
    </Map>
  </div>
</template>
