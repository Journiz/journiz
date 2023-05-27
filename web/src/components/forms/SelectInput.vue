<script setup lang="ts">
import { PropType, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
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

defineEmits(['selected'])

const selectedValue = ref('')

// Trouver l'option sélectionnée en fonction de la valeur de `answerType`
if (props.choice) {
  const selectedOption = props.choices.find(
    (option) => option.value === props.choice
  )
  selectedValue.value = selectedOption ? selectedOption.value : ''
}
</script>
<template>
  <div>
    <label v-if="label" :for="name" class="text-black font-medium"
      >{{ label }}{{ requiredField ? '*' : '' }}</label
    >
    <select
      :id="name"
      v-model="selectedValue"
      :required="requiredField"
      class="relative w-full rounded-md py-4 px-5 mt-2 mb-2 text-green-dark bg-white custom-shadow border-none"
      @change="$emit('selected', $event.target.value)"
    >
      <option disabled value="">{{ emptyQuote }}</option>
      <option
        v-for="choice in choices"
        :key="choice.value"
        :value="choice.value"
      >
        {{ choice.content }}
      </option>
    </select>
  </div>
</template>
<style scoped>
.custom-shadow {
  filter: drop-shadow(0px 1px 2px rgba(0, 35, 30, 0.16));
}
select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}
/* For IE10 */
select::-ms-expand {
  display: none;
}
select {
  background-image: url('../../assets/images/svg/arrow-select.svg');
  background-position: calc(100% - 16px) 50%;
  background-size: 14px 8px;
  background-repeat: no-repeat;
}
</style>
