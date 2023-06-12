<script setup lang="ts">
import { PropType, ref } from 'vue'
import SquareButton from '~/components/buttons/SquareButton.vue'

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
    <label for="search" class="text-black font-medium">{{ label }}</label>
    <div class="relative">
      <input
        id="search"
        ref="searchContent"
        type="text"
        class="w-full border rounded-xl py-4 px-5 mt-2 mb-4 text-black bg-green-dark/4"
      />
      <SquareButton
        class="absolute right-2 top-3.5"
        icon="play"
        color="secondary"
        @click="$emit('makeResearch', searchContent!.value)"
      />
    </div>
  </div>
</template>
