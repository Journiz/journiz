<script setup lang="ts">
import { PropType, ref } from 'vue'
import Map from '~/components/Map.vue'
import MapMarker from '~/components/MapMarker.vue'
import Geocoding from '~/components/Geocoding.vue'
import { Coordinates } from '~/types/Coordinates'
import PointMarker from '~/components/map/PointMarker.vue'

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
    required: false,
  },
})
const researchMarkerPosition = ref(props.initialCoords)
const getGeocodingResult = (data: any) => {
  addSearchMarker(data.center)
}
const clickOnMap = (e: any) => {
  const clickedPosition = e.lngLat.wrap()
  addSearchMarker([clickedPosition.lng, clickedPosition.lat])
}
const addSearchMarker = (data: Coordinates) => {
  emit('update', data)
  researchMarkerPosition.value = data
  map.value.flyToPoint(data)
}
</script>
<template>
  <!-- <pre> 
    https://docs.mapbox.com/playground/geocoding/?search_text=paquier&proximity=ip
    place_name => nom location point 
  </pre> -->
  <div class="relative w-full h-full">
    <Geocoding
      class="absolute left-4 top-4 z-1 w-2/5"
      @select-marker="getGeocodingResult"
    />
    <Map
      ref="map"
      :map-center="mapCenter"
      :zoom="zoom"
      class="w-full h-full"
      @mb-click="clickOnMap"
    >
      <MapMarker
        v-if="researchMarkerPosition && researchMarkerPosition.length > 0"
        :position="researchMarkerPosition as Coordinates"
      >
        <template #icon>
          <PointMarker />
        </template>
      </MapMarker>
      <slot />
    </Map>
  </div>
</template>
