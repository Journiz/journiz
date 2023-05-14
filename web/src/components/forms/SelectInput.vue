<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  emptyQuote: {
    type: String,
    required: true,
  },
  choices: {
    type: Array as PropType<any[]>,
    required: true,
  },
  requiredField: {
    type: Boolean,
    default: true,
  },
})
</script>
<template>
  <label :for="name" class="text-blue-900 font-semibold"
    >{{ label }}{{ requiredField ? '*' : '' }}</label
  >
  <select
    :id="name"
    :required="requiredField"
    class="w-full border rounded-md py-4 px-5 mt-2 mb-4 text-blue-400"
  >
    <option disabled value="">{{ emptyQuote }}</option>
    <option v-for="choice in choices" :key="choice.value" :value="choice.value">
      {{ choice.content }}
    </option>
  </select>
</template>
