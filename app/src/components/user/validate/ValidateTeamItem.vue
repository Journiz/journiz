<script lang="ts" setup="">
import { Team } from '@journiz/api-types'
import Button from '~/components/design-system/Button.vue'
import { getColor } from '~/composables/useThemeColor'
defineProps<{
  team: Team
}>()
</script>
<template>
  <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <div
        class="w-8 h-8 rounded-full"
        :style="{
          backgroundColor: getColor(team.color as any ?? 'red'),
        }"
      ></div>
      <span class="font-bold">{{ team.name }}</span>
    </div>
    <div class="relative">
      <Button color="green">Voir les réponses en attente</Button>
      <span
        class="block absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-red text-white rounded-full transform -translate-y-1/2 translate-x-1/4"
        >2</span
      >
    </div>
  </div>
</template>
