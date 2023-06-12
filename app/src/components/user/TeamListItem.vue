<script setup lang="ts">
import { Team as TeamType } from '@journiz/api-types'
import { PropType } from 'vue'
import Button from '~/components/design-system/Button.vue'
import TeamAvatar from '~/components/team/TeamAvatar.vue'
import { getColor } from '~/composables/useThemeColor'
defineProps({
  team: {
    type: Object as PropType<TeamType>,
    required: true,
  },
})
</script>
<template>
  <div>
    <div class="custom-shadow bg-white py-2 px-3 rounded-lg">
      <div class="flex w-full justify-between mb-4 gap-2 overflow-hidden">
        <div class="custom-width flex items-center gap-3">
          <TeamAvatar class="w-8 h-8 shrink-0" :team="team" />
          <div
            class="overflow-hidden font-bold min-w-0 shrink-1 grow-1 min-w-0"
          >
            <div
              class="overflow-hidden text-ellipsis whitespace-nowrap inline-block w-full"
            >
              {{ team.name }}
            </div>
          </div>
        </div>
        <div
          class="custom-shadow bg-white flex items-center p-3 gap-2 border rounded-xl grow-0 w-36"
          :style="{
          borderColor: getColor(team.color as any ?? 'green'),
        }"
        >
          <div class="i-mdi:star-four-points-circle-outline h-4 w-4" />
          <div class="font-bold whitespace-nowrap">{{ team.score }} points</div>
        </div>
      </div>
      <div class="flex w-full gap-5 items-center">
        <Button class="flex-grow" color="green">Infos de l’équipe</Button>
        <div
          class="custom-shadow rounded-full h-12 w-12 flex items-center justify-center"
          :style="{ backgroundColor: getColor(team.color as any ?? 'green') }"
        >
          <span class="i-uil:map-pin-alt text-white text-xl" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-width {
  width: calc(100% - 153px);
  max-width: calc(100% - 153px);
}
.custom-shadow {
  filter: drop-shadow(0px 1px 3px rgba(0, 35, 30, 0.16));
}
</style>
