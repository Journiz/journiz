<script lang="ts" setup>
import { Team } from '../../../../packages/api-types'
import SquareButton from '~/components/buttons/SquareButton.vue'
defineProps<{
  team: Team
  rank: number
}>()
</script>
<template>
  <div>
    <div class="flex rounded-lg bg-white items-center px-4 py-3">
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
