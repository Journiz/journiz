<script lang="ts" setup>
import { Team } from '../../../../packages/api-types'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
defineProps<{
  team: Team
  rank: number
}>()
</script>
<template>
  <div class="pt-4">
    <!-- <TeamAvatar team="team" /> -->
    <div class="bg-white px-2 pb-6 pt-3 text-center rounded-lg">
      <div class="px-1">
        <div class="font-light mb-4">{{ team.name }}</div>
        <div class="mb-4">
          <span class="font-bold">Score :</span> {{ team.score }} points
        </div>
        <!--<div>
          <span class="font-bold">Nombre d'énigmes :</span>
          {{ team.score }}
        </div> -->
      </div>
      <DefaultButton class="mx-auto" color="secondary">
        <span class="i-uil:download-alt" />
        Télécharger le récapitulatif
      </DefaultButton>
    </div>
  </div>
</template>
