<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import Button from '~/components/design-system/Button.vue'
import useTeamAnswer from '~/composables/useTeamAnswer'
import { teamDistanceFromPoint } from '~/utils/teamDistanceFromPoint'
import { useTeamStore } from '~/stores/team/team'

const props = defineProps<{
  point: Point
}>()

const store = useTeamStore()

const { sendAnswer, loading: validationLoading } = useTeamAnswer(
  props.point,
  true,
  false
)
const submit = async () => {
  const distance = teamDistanceFromPoint(store.team, props.point)
  const isCorrect = distance < 30
  await sendAnswer('location', isCorrect)
}
</script>
<template>
  <div class="flex flex-col gap-2 text-center">
    <p class="text-black/80 font-light italic text-sm mt-6">
      Rendez vous à ce lieu et appuyez sur la bouton. Attention, une erreur vous
      fera perdre des points !
    </p>
    <Button
      color="theme"
      class="mt-4"
      :loading="validationLoading"
      @click="submit"
      >On y est !</Button
    >
  </div>
</template>
