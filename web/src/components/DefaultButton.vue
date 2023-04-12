<script setup>
const props = defineProps({
  secondaryColor: {
    type: Boolean,
    default: false,
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
