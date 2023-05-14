<script lang="ts" setup="">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import PointList from '~/components/point/PointList.vue'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import { useJourneyStore } from '~/stores/journey'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import Map from '~/components/Map.vue'
import MapMarker from '~/components/MapMarker.vue'

const router = useRouter()
const store = useJourneyStore()
const mapCenter = computed(() => {
  return [store.journey!.basecampLongitude, store.journey!.basecampLatitude]
})
</script>
<template>
  <div class="flex flex-col h-full">
    <CustomHeader
      :title="store.journey.name"
      :no-display-return="true"
      class="px-16 h-auto mb-7 pt-12"
    >
      <defaultButton @click="router.push({ name: 'export-journey' })">
        Exporter
      </defaultButton>
    </CustomHeader>
    <div class="px-16 flex flex-grow pb-8 overflow-hidden">
      <PointList class="w-1/2 pr-2 max-h-full overflow-scroll" />
      <div class="relative flex-grow">
        <Map
          class="w-1/2 rounded-xl overflow-hidden"
          :map-center="mapCenter"
          :zoom="14"
        >
          <MapMarker key="center" :position="mapCenter" icon="basecamp" />
          <MapMarker
            v-for="point in store.journey.expand.points"
            :key="point.id"
            :position="[point.longitude, point.latitude]"
            icon="basic"
          />
        </Map>
      </div>
    </div>
  </div>
</template>
