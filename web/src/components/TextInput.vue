<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: null,
  },
  requiredField: {
    type: Boolean,
    default: true,
  },
})
</script>
<template>
  <div class="w-full">
    <label :for="name" class="text-blue-900 font-semibold"
      >{{ label }}{{ requiredField ? '*' : '' }}</label
    >
    <input
      :id="name"
      :required="requiredField"
      type="text"
      class="w-full border rounded-md py-4 px-5 mt-2 mb-4 text-blue-400"
    />
  </div>
</template>
