<script setup lang="ts">
import { Point as PointType } from '@journiz/api-types'
import { computed, toRefs } from 'vue'
import MapWithSearch from '~/components/MapWithSearch.vue'
import { useJourneyStore } from '~/stores/journey'
import { Coordinates } from '~/types/Coordinates'

const store = useJourneyStore()
const props = defineProps<{
  point: PointType
}>()
const { point } = toRefs(props)
const updateLocation = (location: Coordinates) => {
  point.value.longitude = location[0]
  point.value.latitude = location[1]
}
const pointCoords = computed(() => {
  return point.value.longitude && point.value.latitude
    ? [point.value.longitude, point.value.latitude]
    : undefined
})
const mapCenter =
  point.value.longitude && point.value.latitude
    ? [point.value.longitude, point.value.latitude]
    : [store.journey!.basecampLongitude, store.journey!.basecampLatitude]
</script>

<template>
  <div class="w-full flex-grow">
    <MapWithSearch
      :map-center="mapCenter as any"
      :initial-coords="pointCoords as any"
      :zoom="16"
      @update="updateLocation"
    />
  </div>
</template>
