<script lang="ts" setup="">
import { Team as TeamType, Team } from '@journiz/api-types'
import { computed, PropType } from 'vue'

import hatBg from '~/assets/img/hat-bg.png'
import { getColor } from '~/composables/useThemeColor'
const props = defineProps({
  team: {
    type: Object as PropType<TeamType>,
    required: true,
  },
  border: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const avatarUrl = computed(() => {
  if (props.team.hat) {
    return `/img/hats/${props.team.hat}.png`
  }
  return null
})
</script>
<template>
  <div
    class="aspect-square relative overflow-hidden rounded-full"
    :class="border ? 'outline outline-1 outline-beige outline-offset-4' : ''"
    :style="{
          backgroundColor: getColor(team.color as any ?? 'red'),
        }"
  >
    <img :src="hatBg" class="absolute inset-0 w-full h-full opacity-30" />
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      class="w-full h-full object-contain object-center transform scale-90"
      alt=""
    />
  </div>
</template>
