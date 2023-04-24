<script setup lang="ts">
import { PropType, ref } from 'vue'
import Map from '~/components/Map.vue'
import { Coordinates } from '~/types/Coordinates'
import MapMarker from '~/components/MapMarker.vue'
import Geocoding from '~/components/Geocoding.vue'

const emit = defineEmits(['update'])
const map = ref()
const props = defineProps({
  mapCenter: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
  zoom: {
    type: Number as PropType<number>,
    default: 10,
  },
  initialCoords: {
    type: Array as unknown as PropType<Coordinates>,
    default: () => [],
  },
})
const researchMarkerPosition = ref(props.initialCoords)
const addSearchMarker = (data) => {
  emit('update', data.center)
  researchMarkerPosition.value = data.center
  map.value.flyToPoint(data.center)
}
</script>
<template>
  <div class="relative w-full h-full">
    <Geocoding
      class="absolute left-4 top-4 z-1 w-2/5"
      @select-marker="addSearchMarker"
    />
    <Map ref="map" :map-center="mapCenter" :zoom="zoom" class="w-full h-full">
      <MapMarker
        v-if="researchMarkerPosition && researchMarkerPosition.length > 0"
        :position="researchMarkerPosition as Coordinates"
        icon="searched"
      ></MapMarker>
      <slot />
    </Map>
  </div>
</template>
