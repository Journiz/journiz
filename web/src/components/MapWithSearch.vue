<script setup lang="ts">
import { PropType } from 'vue'
import Map from '~/components/Map.vue'
import { Coordinates } from '~/types/Coordinates'
import MapMarker from '~/components/MapMarker.vue'
import SearchBar from '~/components/SearchBar.vue'

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

const doResearch = (searchValue) => {
  // TODO
  console.log('This is the string to research : ' + searchValue)
}
</script>
<template>
  <div>
    <div>
      <SearchBar label="Recherche" @makeResearch="doResearch" />
    </div>
    <Map
      :map-center="mapCenter"
      :zoom="zoom"
      class="w-full h-full"
      :active-geocoding="true"
    >
      <slot />
    </Map>
  </div>
</template>
