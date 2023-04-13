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
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <button
    class="btn-animation py-3 px-6 rounded-lg text-white w-fit cursor-pointer transition-all flex items-center gap-2"
    bg="blue-800 hover:blue-600"
    :class="secondaryColor ? 'bg-blue-300' : ''"
  >
    <SvgSpinners180Ring />
    <slot />
  </button>
</template>
