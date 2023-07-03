<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useJourneyStore } from '~/stores/journey'
import MapWithSafeZone from '~/components/MapWithSafeZone.vue'
import JourneyExportForm from '~/components/journey/JourneyExportForm.vue'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import Basceamp from '~/components/map/Basecamp.vue'
import MapMarker from '~/components/MapMarker.vue'
import PointMarker from '~/components/map/PointMarker.vue'
import ShareJourneyWindow from '~/components/point/ShareJourneyWindow.vue'
import CommunityPointWindow from '~/components/point/CommunityPointWindow.vue'

const journeyStore = useJourneyStore()
const router = useRouter()

const updateGeometry = async (geo: any) => {
  if (journeyStore.journey) {
    journeyStore.journey.safeZone = geo
    await journeyStore.update()
  }
}
let initialTime = '00:00'
if (journeyStore.journey?.duration) {
  const hours = Math.floor(journeyStore.journey.duration / 60)
  const minutes = journeyStore.journey.duration % 60
  initialTime = `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`
}
const time = ref(initialTime)
const security = ref(journeyStore.journey?.hasSafeZone ?? false)
const loading = ref(false)
const windowVisible = ref<boolean>(false)
const exportJourney = async () => {
  loading.value = true
  const success = await journeyStore.exportJourney(time.value, security.value)
  loading.value = false
  if (success) {
    await router.push({ name: 'edit-journey' })
  }
}
</script>

<template>
  <div class="px-16 pt-10 h-full flex flex-col">
    <CustomHeader title="Exporter" class="h-auto mb-7 pt-12">
      <DefaultButton :loading="loading" @click="windowVisible = true">
        <span class="i-uil:share-alt"></span> Partager
      </DefaultButton>
      <DefaultButton :loading="loading" @click="exportJourney">
        Terminer
      </DefaultButton>
    </CustomHeader>
    <div class="flex flex-grow pb-8 overflow-hidden">
      <JourneyExportForm
        v-model:time="time"
        v-model:security="security"
        class="w-1/2 max-h-full overflow-scroll"
      />
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
    <ShareJourneyWindow
      class="z-20"
      :class="windowVisible ? '' : 'opacity-0 pointer-events-none'"
      @close-window="windowVisible = false"
    />
  </div>
</template>
