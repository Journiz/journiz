<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  secondaryColor: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'submit' | 'button' | 'reset'>,
    default: 'button',
  },
})
</script>
<template>
  <button
    class="py-3 px-6 bg-blue-800 rounded-lg text-white w-fit cursor-pointer transition-all hover:bg-blue-600"
    :class="secondaryColor ? 'bg-blue-300' : ''"
  >
    <slot />
  </button>
</template>
