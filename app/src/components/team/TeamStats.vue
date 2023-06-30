<script setup lang="ts">
import { Team } from '@journiz/api-types'
import { useAnswers } from '@journiz/composables'
import TeamAvatar from '~/components/team/TeamAvatar.vue'
import { getColor } from '~/composables/useThemeColor'

const props = defineProps<{
  team: Team
  pointsNumber: number
}>()
const { data: answers } = useAnswers({
  filter: `team="${props.team.id}"`,
})
</script>
<template>
  <div>
    <div class="w-full">
      <TeamAvatar class="h-20 w-20 mx-auto" :team="team" :border="true" />
    </div>
    <div class="flex items-center justify-center gap-5 mt-3">
      <div
        class="flex items-center justify-center bg-white rounded-full h-8 w-8"
      >
        <div
          class="rounded-full h-3 w-3"
          :style="{ backgroundColor: getColor(team.color as any ?? 'green') }"
        ></div>
      </div>
      <div
        class="custom-shadow bg-white flex items-center p-3 gap-2 border rounded-xl grow-0 w-36"
        :style="{
          borderColor: getColor(team.color as any ?? 'green'),
        }"
      >
        <div class="i-mdi:star-four-points-circle-outline h-4 w-4" />
        <div class="font-bold whitespace-nowrap grow text-center">
          {{ team.score }} points
        </div>
      </div>
    </div>
    <div class="flex bg-red rounded-xl p-4 color-white mt-6 justify-between">
      <div class="flex items-center">
        <span class="i-uil:question text-xl" />
        <span>Enigmes résolues</span>
      </div>
      <div>{{ answers.length }} / {{ pointsNumber }}</div>
    </div>
  </div>
</template>
