<script lang="ts" setup="">
import { computed } from 'vue'
import { Point } from '@journiz/api-types'
import { useTeamStore } from '~/stores/team/team'

const store = useTeamStore()
const points = computed<(Point & { hasAnswer: boolean })[]>(() => {
  const allPoints =
    store.journey?.expand?.points?.map((p: Point) => {
      return {
        ...p,
        hasAnswer: !!store.team?.expand?.answers?.find((a) => a.point === p.id),
      }
    }) ?? []
  return allPoints.filter((p: Point) => {
    if (p.trigger) {
      const trigger = allPoints.find((t: Point) => t.id === p.trigger)
      return trigger?.hasAnswer ?? false
    }
    return true
  })
})
</script>
<template>
  <div
    v-if="store.journey"
    class="flex flex-col bg-beige-light pt-3 px-5 pb-64 overflow-y-scroll h-full w-full"
  >
    <div
      class="bg-green-dark flex text-white py-2.5 px-5 rounded-xl flex items-center gap-2 text-sm font-light mb-5"
    >
      <span class="i-material-symbols:other-houses"></span>
      <span class="">
        Point de ralliement : {{ store.journey.basecampName }}
      </span>
    </div>
    <div class="col gap-3">
      <router-link
        v-for="point in points"
        :key="point.id"
        :class="point.hasAnswer ? 'opacity-50 pointer-events-none' : ''"
        :to="{ name: 'team-point', params: { pointId: point.id } }"
      >
        <div
          class="flex items-center gap-3 bg-white rounded-xl shadow-md py-3 px-3"
        >
          <span
            class="i-material-symbols:location-on-rounded text-theme text-32px"
          ></span>
          <span class="font-light text-green-dark">{{ point.name }}</span>
          <span
            v-if="point.trigger && !point.hasAnswer"
            class="ml-auto text-xs font-light text-theme font-light flex-shrink-0 italic"
            >Débloqué !</span
          >
        </div>
      </router-link>
    </div>
  </div>
</template>
