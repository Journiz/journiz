<script lang="ts" setup="">
import { Team as TeamType } from '@journiz/api-types'
import { computed, PropType } from 'vue'

import hatBg from '~/assets/images/backgroundImage/hat-bg.png'
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
  <div class="relative">
    <div
      v-if="border"
      class="absolute w-full h-full top-0 left-0 border border-1 border-beige rounded-full scale-110"
    />
    <div
      class="aspect-square relative overflow-hidden rounded-full"
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
  </div>
</template>
