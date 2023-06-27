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
        class="w-full rounded-xl py-4 px-5 mt-2 mb-4 text-black bg-white drop-shadow-md"
      />
      <SquareButton
        class="absolute right-0 top-2 h-14 w-14 rounded-xl"
        icon="search"
        color="secondary"
        @click="$emit('makeResearch', searchContent!.value)"
      />
    </div>
  </div>
</template>
