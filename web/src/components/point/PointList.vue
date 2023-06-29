<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { Point } from '@journiz/api-types'
import { usePocketBase } from '@journiz/composables'
import PointItem from '~/components/point/PointItem.vue'
import { useJourneyStore } from '~/stores/journey'
import BasecampLine from '~/components/BasecampLine.vue'
import CommunityPointList from '~/components/point/CommunityPointList.vue'
import { PointWithDependents } from '~/types/points'
import Sortable from '~/components/forms/Sortable.vue'

const store = useJourneyStore()
const router = useRouter()
const pb = usePocketBase()

defineProps({
  currentItemId: {
    type: String,
    default: '',
  },
})

async function deletePoint(id: string) {
  try {
    await pb.collection('point').delete(id)
    await store.refresh()
  } catch (e) {
    console.log(e)
  }
}
const points = ref<PointWithDependents[]>([])
const updatePoints = () => {
  const sourcePoints = store.journey?.expand?.points ?? []
  const rootPoints = sourcePoints.filter((p) => !p.trigger)

  const affectDependents = (points: Point[]) => {
    points.forEach((point: PointWithDependents) => {
      point.dependents = sourcePoints.filter((p) => p.trigger === point.id)
      affectDependents(point.dependents)
    })
  }
  affectDependents(rootPoints)
  points.value = rootPoints
}
watch(() => store.journey?.expand?.points ?? [], updatePoints)
updatePoints()

const sortPointDependents = (
  pointId: string,
  dependents: PointWithDependents[]
) => {
  const pointIndex = points.value.findIndex((p) => p.id === pointId)
  if (points.value[pointIndex]?.dependents) {
    points.value[pointIndex].dependents = dependents as any[]
  }
}
watch(
  points,
  async (newPoints) => {
    await store.updateOrderFromNestedArray(newPoints)
  },
  { deep: true }
)
// const editPoint = async (id: string) => {
//   await console.log('edit point', id)
// }
</script>

<template>
  <article class="pb-6">
    <BasecampLine
      v-if="store.journey"
      :basecamp-name="store.journey.basecampName"
      @editBasecamp="router.push({ name: 'basecamp-journey' })"
    />
    <div v-if="store.loading">Chargement...</div>
    <div v-else-if="store.journey">
      <!-- <pre>{{ store.journey.expand.points }}</pre> -->
      <Sortable
        v-model="points"
        class="flex flex-col gap-4"
        item-key="id"
        transition-name="drag-list"
        :sortable-options="{
          handle: '.handle-0',
        }"
      >
        <template #item="{ item: point }">
          <PointItem
            :point="point"
            :level="0"
            :current-item-id="currentItemId"
            @sort-dependents="sortPointDependents(point.id, $event)"
            @edit-point="
              $router.push({
                name: 'edit-point',
                params: { pointId: $event },
              })
            "
            @delete-point="deletePoint($event)"
          />
        </template>
      </Sortable>
    </div>
    <CommunityPointList
      v-if="store.journey"
      :basecamp-latitude="store.journey.basecampLatitude"
      :basecamp-longitude="store.journey.basecampLongitude"
    />
  </article>
</template>
