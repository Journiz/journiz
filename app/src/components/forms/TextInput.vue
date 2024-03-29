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
  tabindex: {
    type: String,
    default: '0',
  },
})

const emit = defineEmits(['update:modelValue'])
const input = ref()
const onInput = (e: any) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
onMounted(() => {
  if (props.svgName) {
    imageURL = "'/img/inputsIcons/" + props.svgName + ".svg'"
  }
})
const togglePasswordVisibility = () => {
  if (input.value.type === 'password') {
    input.value.type = 'text'
  } else {
    input.value.type = 'password'
  }
}
</script>
<template>
  <div class="w-full relative">
    <label
      v-if="label"
      :for="input?.id"
      class="text-xs font-medium color-green-dark/75 pl-3"
      >{{ label
      }}{{ requiredField && !noDisplayRequiredStars ? '*' : '' }}</label
    >
    <input
      ref="input"
      :value="modelValue"
      :required="requiredField"
      :type="type"
      class="w-full border rounded-md py-3 px-5 mt-2 mb-2 text-green-dark bg-green-dark/4"
      :class="[
        alternativeStyle
          ? 'bg-green-dark/4'
          : 'bg-white custom-shadow border-none',
        svgName ? 'got-icon' : '',
      ]"
      :style="{ backgroundImage: 'url(' + imageURL + ')' }"
      :tabindex="tabindex"
      @input="onInput"
    />
    <div
      v-if="type === 'password'"
      :toggle="'#' + input?.id"
      class="i-uil:eye hover:scale-125 transition-all h-4 w-4 color-red field-icon toggle-password cursor-pointer absolute right-4 bottom-6"
      @click="togglePasswordVisibility"
    ></div>
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
  transition: background-size 0.5s;
}
input.got-icon:focus {
  background-size: 14px auto;
}
</style>
