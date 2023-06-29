<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Point } from '@journiz/api-types'
import { teamDistanceFromPoint } from '~/utils/teamDistanceFromPoint'
import { useTeamStore } from '~/stores/team/team'
import { showModal } from '~/composables/useModal'

const props = defineProps<{
  point: Point
}>()

const store = useTeamStore()

const distanceFromPoint = computed<number>(() => {
  if (!store.team) {
    return -1
  }
  return teamDistanceFromPoint(store.team, props.point)
})

const canOpenPoint = computed(() => {
  return (
    props.point.answerType === 'location' ||
    !props.point.hasLocation ||
    (distanceFromPoint.value < 15 && distanceFromPoint.value >= 0)
  )
})

const router = useRouter()
const onClick = () => {
  if (!canOpenPoint.value) {
    return showModal(
      'Pas si vite !',
      `Vous êtes trop loin (${Math.round(
        distanceFromPoint.value
      )}m) du point. Rapprochez-vous pour voir l'énigme.`,
      [{ actionName: 'ok', title: "Ok, on s'approche !" }],
      'warn'
    )
  }
  return router.push({
    name: 'team-point',
    params: { pointId: props.point.id },
  })
}
</script>
<template>
  <button
    :class="{
      'opacity-60': !canOpenPoint,
    }"
    @click="onClick"
  >
    <span
      class="flex items-center gap-3 bg-white rounded-xl shadow-md py-3 px-3"
    >
      <span
        class="i-material-symbols:location-on-rounded text-theme text-32px"
        :class="[
          point.hasLocation && point.answerType !== 'location'
            ? 'i-material-symbols:location-on-rounded'
            : 'i-uil:question',
        ]"
      ></span>
      <span class="font-light text-green-dark">{{ point.name }}</span>
      <span
        v-if="point.trigger"
        class="ml-auto text-xs font-light text-theme font-light flex-shrink-0 italic"
        >Débloqué !</span
      >
    </span>
  </button>
</template>
