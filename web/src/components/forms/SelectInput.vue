<script setup lang="ts">
import { PropType, ref } from 'vue'

const props = defineProps({
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
  choice: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['selected'])

const selectedValue = ref('')

// Trouver l'option sélectionnée en fonction de la valeur de `answerType`
if (props.choice) {
  const selectedOption = props.choices.find(
    (option) => option.value === props.choice
  )
  selectedValue.value = selectedOption ? selectedOption.value : ''
}
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('selected', target.value)
}
</script>
<template>
  <label :for="name" class="text-blue-900 font-semibold"
    >{{ label }}{{ requiredField ? '*' : '' }}</label
  >
  <select
    :id="name"
    v-model="selectedValue"
    :required="requiredField"
    class="w-full border rounded-md py-4 px-5 mt-2 mb-4 text-blue-400"
    @change="onChange"
  >
    <option disabled value="">{{ emptyQuote }}</option>
    <option v-for="choice in choices" :key="choice.value" :value="choice.value">
      {{ choice.content }}
    </option>
  </select>
</template>
