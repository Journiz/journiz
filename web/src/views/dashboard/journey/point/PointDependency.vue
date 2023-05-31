<script setup lang="ts">
import { computed, ref } from 'vue'
import EditPointTrigger from '~/components/point/EditPointTrigger.vue'
import { usePointStore } from '~/stores/point'
import Basceamp from '~/components/map/Basecamp.vue'
import MapMarker from '~/components/MapMarker.vue'
import Map from '~/components/Map.vue'
import PointMarker from '~/components/map/PointMarker.vue'
import { useJourneyStore } from '~/stores/journey'
const store = usePointStore()

const pointTrigger = ref({})
const trigger = ref('false')
const handlePointTrigger = (value: object) => {
  console.log(value)
  pointTrigger.value = value
}
const journeyStore = useJourneyStore()
const currentPointStore = usePointStore()

const mapCenter = computed(() => {
  return [
    journeyStore.journey!.basecampLongitude,
    journeyStore.journey!.basecampLatitude,
  ]
})
</script>
<template>
  <section class="flex flex-grow pb-8 overflow-hidden pt-8">
    <EditPointTrigger
      :point="store.point"
      class="pr-4 w-5/12 max-h-full overflow-scroll"
      @pointTrigger="handlePointTrigger"
      @update:isTrigger="trigger = $event"
    />
    <div class="w-7/12">
      <Map zoom="14" :map-center="mapCenter">
        <MapMarker key="center" :position="mapCenter as any">
          <template #icon>
            <Basceamp />
          </template>
        </MapMarker>
        <MapMarker
          :position="[
            currentPointStore.point.longitude,
            currentPointStore.point.latitude,
          ]"
        >
          <template #icon>
            <PointMarker />
          </template>
        </MapMarker>
        <MapMarker
          v-if="pointTrigger"
          :position="[pointTrigger.long, pointTrigger.lat]"
        >
          <template #icon>
            <PointMarker class="opacity-50" />
          </template>
        </MapMarker>
      </Map>
    </div>
  </section>
</template>
