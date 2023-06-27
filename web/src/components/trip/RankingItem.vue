<script lang="ts" setup>
import { Team } from '../../../../packages/api-types'
import SquareButton from '~/components/buttons/SquareButton.vue'
import { getColor } from '~/composables/useThemeColor'
import TeamAvatar from '~/components/TeamAvatar.vue'
defineProps<{
  team: Team
  rank: number
}>()
</script>
<template>
  <div class="flex gap-1">
    <div class="relative w-20 flex items-center justify-center">
      <div
        class="absolute z-1 w-6 h-6 text-sm top-0 left-0 bg-green rounded-full flex items-center justify-center color-white font-extrabold"
      >
        {{ rank + 3 }}
      </div>
      <TeamAvatar :border="true" class="w-16" :team="team" />
    </div>
    <div
      class="grow flex rounded-lg bg-white items-center px-4 py-3 drop-shadow-md"
    >
      <div
        class="h-8 w-8 flex justify-center items-center rounded-full bg-white drop-shadow-md mr-3"
      >
        <div
          class="w-3 h-3 rounded-full"
          :style="`background-color: ${getColor(team.color)};`"
        ></div>
      </div>
      <div class="grow flex gap-6">
        <div>{{ team.name }}</div>
        <div>
          <span class="font-bold">Score :</span> {{ team.score }} points
        </div>
        <!--<div>
          <span class="font-bold">Nombre d'énigmes :</span>
          {{ team.score }}
        </div> -->
      </div>
      <SquareButton icon="download" color="secondary" />
    </div>
  </div>
</template>
