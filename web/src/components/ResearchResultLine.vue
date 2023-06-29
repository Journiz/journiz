<script setup lang="ts">
import { PropType } from 'vue'
defineProps({
  data: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})
</script>
<template>
  <div
    class="rounded-xl px-3 py-4 mb-3 bg-white cursor-pointer font-light text-sm text-black transition-alle"
    :class="isSelected ? 'border-2 border-solid border-red' : ''"
  >
    {{ data.place_name }}
  </div>
</template>
