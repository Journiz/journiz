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

const selectedPointId = ref('')
</script>
<template>
  <div class="flex flex-col h-full">
    <CustomHeader :title="store.journey!.name" class="px-16 h-auto mb-12 pt-12">
      <defaultButton @click="router.push({ name: 'export-journey' })">
        Exporter
      </defaultButton>
    </CustomHeader>
    <div class="px-16 flex flex-grow pb-8 overflow-hidden">
      <PointList
        v-model:selected-id="selectedPointId"
        :show-basecamp="false"
        :editable="false"
        class="w-1/2 pr-2 max-h-full overflow-scroll"
      />
      <div class="relative flex-grow p-4">Preview {{ selectedPointId }}</div>
    </div>
  </div>
</template>
