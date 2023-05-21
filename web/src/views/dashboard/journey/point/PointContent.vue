<script setup lang="ts">
import { computed } from 'vue'
import EditPointContent from '~/components/point/EditPointContent.vue'
import Map from '~/components/Map.vue'
import { useJourneyStore } from '~/stores/journey'
import MapMarker from '~/components/MapMarker.vue'
import { usePointStore } from '~/stores/point'

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
  <section class="h-full flex">
    <EditPointContent class="pr-4 w-5/12" />
    <div class="w-7/12">
      <Map zoom="14" :map-center="mapCenter">
        <MapMarker key="center" :position="mapCenter as any">
          <template #icon>
            <div
              class="relative w-18 h-18 rounded-full shadow-lg overflow-hidden flex items-center justify-center"
            >
              <div
                class="w-full h-full absolute top-0 left-0 bg-white/40"
              ></div>
              <div
                class="h-8 w-8 rounded-full bg-white text-4 color-green-dark/75 flex items-center justify-center"
              >
                <div class="i-uil:home"></div>
              </div>
            </div>
          </template>
        </MapMarker>
        <MapMarker
          :position="[
            currentPointStore.point.longitude,
            currentPointStore.point.latitude,
          ]"
        >
          <template #icon>
            <div
              class="relative w-18 h-18 rounded-full shadow-lg overflow-hidden flex items-center justify-center"
            >
              <div
                class="w-full h-full absolute top-0 left-0 bg-green-dark/25"
              ></div>
              <div
                class="h-8 w-8 rounded-full bg-green-dark/80 text-6 color-white flex items-center justify-center"
              >
                <div class="i-uil:question"></div>
              </div>
            </div>
          </template>
        </MapMarker>
      </Map>
    </div>
  </section>
</template>
