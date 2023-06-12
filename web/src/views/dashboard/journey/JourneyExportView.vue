<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'
import MapWithSafeZone from '~/components/MapWithSafeZone.vue'
import JourneyExportForm from '~/components/journey/JourneyExportForm.vue'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import Basceamp from '~/components/map/Basecamp.vue'
import MapMarker from '~/components/MapMarker.vue'
import PointMarker from '~/components/map/PointMarker.vue'

const journeyStore = useJourneyStore()
const router = useRouter()

const updateGeometry = async (geo: any) => {
  if (journeyStore.journey) {
    journeyStore.journey.safeZone = geo
    await journeyStore.update()
  }
}
</script>

<template>
  <div class="px-16 pt-10 h-full flex flex-col">
    <CustomHeader title="Exporter" class="h-auto mb-7 pt-12">
      <DefaultButton>Terminer</DefaultButton>
    </CustomHeader>
    <div class="flex flex-grow pb-8 overflow-hidden">
      <JourneyExportForm class="w-1/2 max-h-full overflow-scroll" />
      <div class="relative flex-grow">
        <MapWithSafeZone
          class="flex-grow w-1/2 rounded-xl overflow-hidden"
          :draw-data="journeyStore.journey?.safeZone"
          :map-center="[journeyStore.journey!.basecampLongitude, journeyStore.journey!.basecampLatitude]"
          :zoom="14"
          @safeAreaGeometry="updateGeometry"
        >
          <MapMarker
            v-for="point in journeyStore.journey!.expand!.points"
            :key="point.id"
            :position="[point.longitude, point.latitude]"
          >
            <template #icon>
              <PointMarker />
            </template>
          </MapMarker>
          <MapMarker
            key="center"
            :position="[journeyStore.journey!.basecampLongitude, journeyStore.journey!.basecampLatitude]"
          >
            <template #icon> <Basceamp /> </template>
          </MapMarker>
        </MapWithSafeZone>
      </div>
    </div>
  </div>
</template>
