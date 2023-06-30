<script lang="ts" setup="">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import PointList from '~/components/point/PointList.vue'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import { useJourneyStore } from '~/stores/journey'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import PointPreview from '~/components/point/preview/PointPreview.vue'

const router = useRouter()
const store = useJourneyStore()

const selectedPointId = useRouteQuery('pointId', '')
const selectedPoint = computed(() => {
  return store.journey?.expand?.points?.find(
    (p) => p.id === selectedPointId.value
  )
})
</script>
<template>
  <div class="flex flex-col h-full">
    <CustomHeader :title="store.journey!.name" class="px-16 h-auto mb-12 pt-12">
      <DefaultButton @click="router.push({ name: 'export-journey' })">
        <span class="i-uil:export"></span>
        Exporter
      </DefaultButton>
    </CustomHeader>
    <div class="px-16 flex flex-grow pb-8 overflow-hidden">
      <PointList
        v-model:selected-id="selectedPointId"
        :show-basecamp="false"
        :editable="false"
        class="w-1/2 pr-2 max-h-full overflow-scroll flex-shrink-0"
      />
      <div class="relative grow">
        <PointPreview :point="selectedPoint" />
      </div>
    </div>
  </div>
</template>
