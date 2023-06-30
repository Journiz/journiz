<script setup lang="ts">
import { PropType, ref } from 'vue'
import Map from '~/components/Map.vue'
import MapMarker from '~/components/MapMarker.vue'
import Geocoding from '~/components/Geocoding.vue'
import { Coordinates } from '~/types/Coordinates'
import PointMarker from '~/components/map/PointMarker.vue'
import Basecamp from '~/components/map/Basecamp.vue'

const emit = defineEmits(['update'])
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
  isBasecampMap: {
    type: Boolean,
    default: false,
  },
})
const map = ref()
const researchMarkerPosition = ref(props.initialCoords)
const getGeocodingResult = (data: any) => {
  addSearchMarker(data.center)
}
const markerDragEnd = (e) => {
  const dragPosition = e.target.getLngLat()
  addSearchMarker([dragPosition.lng, dragPosition.lat])
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
        :draggable="true"
        @mb-dragend="markerDragEnd"
      >
        <template #icon>
          <Basecamp v-if="isBasecampMap" />
          <PointMarker v-else />
        </template>
      </MapMarker>
      <slot />
    </Map>
  </div>
</template>
