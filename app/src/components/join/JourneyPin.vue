<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])
const inputs = ref([])
let pin = ''
const clickOnInput = (key) => {
  pin = ''
  if (key !== 1) {
    inputs.value[0].value = ''
    inputs.value[0].focus()
  }
}
const keyUpOnInput = (key) => {
  if (key === 4) {
    pin += inputs.value[key - 1].value
    inputs.value[key - 1].blur()
    emit('update:modelValue', { pin })
  } else {
    pin += inputs.value[key - 1].value
    inputs.value[key].value = ''
    inputs.value[key].focus()
  }
}
</script>
<template>
  <form class="relative flex gap-3 justify-center">
    <input
      v-for="n in 4"
      :key="n"
      ref="inputs"
      class="w-10 h-13 rounded-xl flex justify-center items-center text-center"
      type="number"
      maxlength="1"
      @click="clickOnInput(n)"
      @keyup="keyUpOnInput(n)"
    />
  </form>
</template>
<style scoped>
input {
  filter: drop-shadow(0px 1px 3px rgba(0, 35, 30, 0.16));
}
</style>
