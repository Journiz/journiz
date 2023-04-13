<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div class="rounded-xl bg-blue-500 text-white px-3 py-4 mb-3 cursor-pointer">
    {{ data.place_name }}
  </div>
</template>
