<script lang="ts" setup>
import { Team } from '../../../../packages/api-types'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import { getColor } from '~/composables/useThemeColor'
import TeamAvatar from '~/components/TeamAvatar.vue'
defineProps<{
  team: Team
  rank: number
}>()
</script>
<template>
  <div class="pt-4">
    <div class="h-60 w-60 mx-auto flex items-end mb-5 justify-center">
      <div class="relative rounded-full drop-shadow-sm">
        <div
          :class="[
            rank === 0 ? 'h-15 w-15 text-4xl' : '',
            rank === 1 ? 'h-12 w-12 text-3xl' : '',
            rank === 2 ? 'h-9 w-9 text-xl' : '',
          ]"
          class="absolute z-1 top-0 bg-green rounded-full flex items-center justify-center color-white font-extrabold left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {{ rank + 1 }}
        </div>
        <TeamAvatar
          :border="true"
          :class="[
            rank === 0 ? 'h-60 w-60' : '',
            rank === 1 ? 'h-50 w-50' : '',
          ]"
          class="h-40 w-40 mx-auto"
          :team="team"
        />
      </div>
    </div>
    <div class="bg-white px-2 pb-6 pt-3 text-center rounded-lg drop-shadow-md">
      <div class="px-1">
        <div class="font-light mb-4 flex items-center justify-center">
          <div
            class="h-8 w-8 flex justify-center items-center rounded-full bg-white drop-shadow-md mr-3"
          >
            <div
              class="w-3 h-3 rounded-full"
              :style="`background-color: ${getColor(team.color)};`"
            ></div>
          </div>
          {{ team.name }}
        </div>
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
