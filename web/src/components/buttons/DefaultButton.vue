<script setup lang="ts">
import { ButtonHTMLAttributes, PropType } from 'vue'
// @ts-ignore
import SvgSpinners180Ring from '~icons/svg-spinners/180-ring'

defineProps({
  secondaryColor: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
})
</script>
<template>
  <button
    class="btn-animation py-3 px-6 bg-blue-800 rounded-lg text-white w-fit cursor-pointer transition-all hover:bg-blue-600 flex items-center gap-2"
    :class="secondaryColor ? 'bg-blue-300' : ''"
  >
    <SvgSpinners180Ring />
    <slot />
  </button>
</template>
