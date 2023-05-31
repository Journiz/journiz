<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: null,
  },
  requiredField: {
    type: Boolean,
    default: true,
  },
  alternativeStyle: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 4,
  },
})

const emit = defineEmits(['update:modelValue'])
const input = ref()
const onInput = (e: any) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
<template>
  <div class="w-full">
    <label v-if="label" :for="input?.id" class="text-black font-medium"
      >{{ label }}{{ requiredField ? '*' : '' }}</label
    >
    <textarea
      ref="input"
      v-uid
      :value="modelValue"
      :required="requiredField"
      :rows="rows"
      class="w-full border rounded-md py-3 px-4 mt-2 mb-2 text-green-dark bg-green-dark/4"
      :class="
        alternativeStyle
          ? 'bg-green-dark/4'
          : 'bg-white custom-shadow border-none'
      "
      @input="onInput"
    />
  </div>
</template>
<style scoped>
.custom-shadow {
  filter: drop-shadow(0px 1px 2px rgba(0, 35, 30, 0.16));
}
</style>
