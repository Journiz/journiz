<script lang="ts" setup="">
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import PointList from '~/components/point/PointList.vue'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import { useJourneyStore } from '~/stores/journey'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import Map from '~/components/Map.vue'
import MapMarker from '~/components/MapMarker.vue'
import PointMarker from '~/components/map/PointMarker.vue'
import Basceamp from '~/components/map/Basecamp.vue'

const router = useRouter()
const store = useJourneyStore()
const mapCenter = computed(() => {
  return [store.journey!.basecampLongitude, store.journey!.basecampLatitude]
})
const addLoading = ref(false)
const currentItemId = ref('')
const newPoint = async () => {
  addLoading.value = true
  try {
    const newPoint = await store.newPoint()
    addLoading.value = false
    if (newPoint) {
      await router.push({ name: 'edit-point', params: { pointId: newPoint } })
    }
  } catch (e) {
    console.log(e)
  }
  addLoading.value = false
}
function hoverMarker(pointId: string) {
  currentItemId.value = pointId
}
</script>
<template>
  <div class="flex flex-col h-full">
    <CustomHeader
      :title="store.journey!.name"
      :no-display-return="true"
      class="px-16 h-auto mb-7 pt-12"
    >
      <DefaultButton @click="router.push({ name: 'preview-journey' })">
        <span class="i-uil:eye"></span> Prévisualiser
      </DefaultButton>
      <DefaultButton @click="router.push({ name: 'export-journey' })">
        <span class="i-uil:export"></span> Exporter
      </DefaultButton>
    </CustomHeader>
    <div class="px-16">
      <DefaultButton class="mb-6" :loading="addLoading" @click="newPoint">
        Ajouter un nouveau point
      </DefaultButton>
    </div>
    <div class="px-16 flex flex-grow pb-8 overflow-hidden">
      <PointList
        class="w-1/2 pr-2 max-h-full overflow-scroll"
        :show-community="true"
        :editable="true"
        :sortable="true"
        :current-item-id="currentItemId"
      />
      <div class="relative flex-grow">
        <Map
          class="w-1/2 rounded-xl overflow-hidden"
          :map-center="mapCenter as any"
          :zoom="14"
        >
          <MapMarker
            v-for="point in store.journey!.expand!.points"
            :key="point.id"
            :position="[point.longitude, point.latitude]"
          >
            <template #icon>
              <PointMarker @mouseover="hoverMarker(point.id)" />
            </template>
          </MapMarker>
          <MapMarker key="center" :position="mapCenter as any">
            <template #icon> <Basceamp /> </template>
          </MapMarker>
        </Map>
      </div>
    </div>
  </div>
</template>
