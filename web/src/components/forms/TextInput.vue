<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  label: {
    type: String,
    required: true,
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
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmits(['update:modelValue'])

const input = ref()
</script>
<template>
  <div class="w-full">
    <label :for="input?.id" class="text-blue-900 font-semibold"
      >{{ label }}{{ requiredField ? '*' : '' }}</label
    >
    <input
      ref="input"
      v-uid
      :value="modelValue"
      :required="requiredField"
      :type="type"
      class="w-full border rounded-md py-4 px-5 mt-2 mb-4 text-blue-400"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
