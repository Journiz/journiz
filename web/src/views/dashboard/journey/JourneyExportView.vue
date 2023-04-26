<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'
import MapWithSafeZone from '~/components/MapWithSafeZone.vue'
import JourneyExportForm from '~/components/journey/JourneyExportForm.vue'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

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
          :map-center="[journeyStore.journey!.basecampLongitude, journeyStore.journey!.basecampLatitude]"
          @safeAreaGeometry="updateGeometry"
        />
      </div>
    </div>
  </div>
</template>
