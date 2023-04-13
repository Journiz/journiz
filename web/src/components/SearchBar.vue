<script setup lang="ts">
import { PropType, ref } from 'vue'
import SquareButton from '~/components/SquareButton.vue'

defineEmits(['makeResearch'])
const searchContent = ref<HTMLInputElement>()

defineProps({
  label: {
    type: String as PropType<string>,
    required: true,
  },
})
</script>
<template>
  <div>
    <label for="search">{{ label }}</label>
    <div class="relative">
      <input
        id="search"
        ref="searchContent"
        type="text"
        class="w-full border rounded-md py-4 px-5 mt-2 mb-4 text-blue-400"
      />
      <SquareButton
        icon="play"
        @click="$emit('makeResearch', searchContent.value)"
      />
    </div>
  </div>
</template>
<style>
.mapboxgl-ctrl-top-right {
}
</style>
