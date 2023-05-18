<script lang="ts" setup="">
import { computed, ref } from 'vue'
import { Team } from '@journiz/api-types'
const props = defineProps<{
  modelValue: Team['hat']
}>()
const emit = defineEmits(['update:modelValue'])

const hat = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const hats: Team['hat'][] = ['crown', 'headset', 'party', 'bucket']

const initialHatIndex = hats.indexOf(props.modelValue)
const currentHatIndex = ref(initialHatIndex > -1 ? initialHatIndex : 0)
const next = () => {
  currentHatIndex.value = (currentHatIndex.value + 1) % hats.length
  hat.value = hats[currentHatIndex.value]
}
const prev = () => {
  if (currentHatIndex.value === 0) {
    currentHatIndex.value = hats.length - 1
  } else {
    currentHatIndex.value--
  }
  hat.value = hats[currentHatIndex.value]
}
</script>
<template>
  <div class="flex items-center gap-2">
    <button class="h-10 w-10 i-uil:angle-left-b" @click="prev"></button>
    <div
      class="flex-grow bg-theme rounded-full aspect-square overflow-hidden relative"
    >
      <div
        class="absolute h-full top-0 left-0 flex transition duration-200"
        :style="{
          width: hats.length * 100 + '%',
          transform:
            'translateX(-' + (currentHatIndex * 100) / hats.length + '%)',
        }"
      >
        <div
          v-for="hat in hats"
          :key="hat"
          class="h-full flex items-center justify-center text-white"
          :style="{
            width: 100 / hats.length + '%',
          }"
        >
          {{ hat }}
        </div>
      </div>
    </div>
    <button class="w-10 h-10 i-uil:angle-right-b" @click="next"></button>
  </div>
</template>
