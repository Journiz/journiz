<script setup lang="ts">
import { onMounted, ref } from 'vue'
let imageURL = ''
const props = defineProps({
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
  type: {
    type: String,
    default: 'text',
  },
  alternativeStyle: {
    type: Boolean,
    default: false,
  },
  noDisplayRequiredStars: {
    type: Boolean,
    default: false,
  },
  svgName: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])
const input = ref()
const onInput = (e: any) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
onMounted(() => {
  if (props.svgName) {
    imageURL = "'src/assets/images/svg/inputsIcons/" + props.svgName + ".svg'"
  }
})
</script>
<template>
  <div class="w-full">
    <label v-if="label" :for="input?.id" class="text-black font-medium"
      >{{ label
      }}{{ requiredField && !noDisplayRequiredStars ? '*' : '' }}</label
    >
    <input
      ref="input"
      v-uid
      :value="modelValue"
      :required="requiredField"
      :type="type"
      class="w-full border rounded-md py-4 px-5 mt-2 mb-2 text-green-dark bg-green-dark/4"
      :class="[
        alternativeStyle
          ? 'bg-green-dark/4'
          : 'bg-white custom-shadow border-none',
        svgName ? 'got-icon' : '',
      ]"
      :style="{ backgroundImage: 'url(' + imageURL + ')' }"
      @input="onInput"
    />
  </div>
</template>
<style scoped>
.custom-shadow {
  filter: drop-shadow(0px 1px 2px rgba(0, 35, 30, 0.16));
}
input.got-icon {
  padding-left: 40px;
  background-position: 16px 50%;
  background-size: 18px auto;
  background-repeat: no-repeat;
}
</style>
