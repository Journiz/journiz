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
    class="rounded-xl px-3 py-4 mb-3 cursor-pointer font-medium text-sm"
    :class="isSelected ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-700'"
  >
    {{ data.place_name }}
  </div>
</template>
