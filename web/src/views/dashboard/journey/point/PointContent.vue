<script setup lang="ts">
import { computed } from 'vue'
import EditPointContent from '~/components/point/EditPointContent.vue'
import Map from '~/components/Map.vue'
import { useJourneyStore } from '~/stores/journey'
import MapMarker from '~/components/MapMarker.vue'
import { usePointStore } from '~/stores/point'
import Basceamp from '~/components/map/Basecamp.vue'
import PointMarker from '~/components/map/PointMarker.vue'

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
  <section class="flex flex-grow pb-8 overflow-hidden">
    <EditPointContent class="pr-4 w-5/12 max-h-full overflow-scroll" />
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
      </Map>
    </div>
  </section>
</template>
