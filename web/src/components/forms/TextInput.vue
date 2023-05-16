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
const onInput = (e: any) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
<template>
  <div class="w-fit">
    <label :for="input?.id" class="text-black font-medium"
      >{{ label }}{{ requiredField ? '*' : '' }}</label
    >
    <input
      ref="input"
      v-uid
      :value="modelValue"
      :required="requiredField"
      :type="type"
      class="w-full border rounded-md py-4 px-5 mt-2 mb-4 text-green-dark bg-green-dark/4"
      @input="onInput"
    />
  </div>
</template>
