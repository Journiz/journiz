<script setup lang="ts">
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
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmits(['update:modelValue'])
const onInput = (e: any) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
<template>
  <div class="w-full flex flex-col text-left gap-4">
    <label class="font-medium text-sm"
      >{{ label }}{{ requiredField ? ' *' : '' }}</label
    >
    <input
      :value="modelValue"
      :required="requiredField"
      :type="type"
      class="w-full rounded-lg py-2.75 px-4 text-green-dark bg-white shadow-md focus:outline-none border border-transparent focus:border-theme"
      @input="onInput"
    />
  </div>
</template>
<style scoped>
.input-ring {
  @apply focus:(outline-none);
}
</style>
