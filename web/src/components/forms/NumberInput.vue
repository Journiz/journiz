<script setup lang="ts">
import { ref } from 'vue'
import SquareButton from '~/components/buttons/SquareButton.vue'
defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: String,
    default: '0',
    required: true,
  },
  requiredField: {
    type: Boolean,
    default: true,
  },
  alternativeStyle: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const input = ref()
const onInput = (e: any) => {
  emit('update:modelValue', (e.target as unknown as HTMLInputElement).value)
}
const changeValue = (typeOfChange: string) => {
  if (typeOfChange === 'increment') {
    input.value.value = parseInt(input.value.value) + 1
  } else if (typeOfChange === 'decrement') {
    input.value.value = parseInt(input.value.value) - 1
  }
  console.log(typeof input.value.value)
  emit('update:modelValue', (input as unknown as HTMLInputElement).value.value)
}
</script>
<template>
  <div>
    <label v-if="label" :for="input?.id" class="text-black font-medium"
      >{{ label }}{{ requiredField ? '*' : '' }}</label
    >
    <div class="flex mt-2 mb-2 items-center">
      <SquareButton
        class="mr-2"
        color="secondary"
        icon="minus"
        @click="changeValue('decrement')"
      />
      <input
        ref="input"
        v-uid
        :value="modelValue"
        :required="requiredField"
        type="number"
        class="w-fit border rounded-md py-4 px-5 text-green-dark bg-green-dark/4 text-sm leading-none text-center"
        :class="
          alternativeStyle
            ? 'bg-green-dark/4'
            : 'bg-white custom-shadow border-none'
        "
        @input="onInput"
      />
      <SquareButton
        class="ml-2"
        color="secondary"
        icon="plus"
        @click="changeValue('increment')"
      />
    </div>
  </div>
</template>
<style scoped>
.custom-shadow {
  filter: drop-shadow(0px 1px 2px rgba(0, 35, 30, 0.16));
}
input {
  max-width: 64px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
