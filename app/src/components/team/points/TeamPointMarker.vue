<script setup lang="ts">
import { Point } from '@journiz/api-types'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '~/stores/team/team'
import { teamDistanceFromPoint } from '~/utils/teamDistanceFromPoint'
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
  <div
    class="relative w-18 h-18 rounded-full shadow-lg overflow-hidden flex items-center justify-center"
    @click="onClick"
  >
    <div class="w-full h-full absolute top-0 left-0 bg-green-dark/25"></div>
    <div
      class="h-8 w-8 rounded-full bg-green-dark/80 text-6 color-white flex items-center justify-center"
    >
      <div class="i-uil:question"></div>
    </div>
  </div>
</template>
