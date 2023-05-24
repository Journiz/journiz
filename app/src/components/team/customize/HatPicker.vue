<script lang="ts" setup="">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Team } from '@journiz/api-types'
import { createGesture } from '@ionic/core'
import gsap from 'gsap'
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
  if (currentHatIndex.value < hats.length - 1) {
    currentHatIndex.value++
  }
  hat.value = hats[currentHatIndex.value]
}
const prev = () => {
  if (currentHatIndex.value > 0) {
    currentHatIndex.value--
  }
  hat.value = hats[currentHatIndex.value]
}

const el = ref()
const isDragging = ref(false)
const additionalTranslateValue = ref(0)
onMounted(() => {
  const gesture = createGesture({
    el: el.value,
    gestureName: 'dragToChangeHat',
    threshold: 0,
    onStart: () => {
      isDragging.value = true
    },
    onMove: (detail) => {
      if (detail.deltaX > 0 && currentHatIndex.value === 0) {
        additionalTranslateValue.value = detail.deltaX / 4
      } else if (
        detail.deltaX < 0 &&
        currentHatIndex.value === hats.length - 1
      ) {
        additionalTranslateValue.value = detail.deltaX / 4
      } else {
        additionalTranslateValue.value = detail.deltaX
      }
    },
    onEnd: (detail) => {
      additionalTranslateValue.value = 0
      isDragging.value = false
      if (Math.abs(detail.deltaX) > 100) {
        if (currentHatIndex.value > 0 && detail.deltaX > 0) {
          prev()
        } else if (
          currentHatIndex.value < hats.length - 1 &&
          detail.deltaX < 0
        ) {
          next()
        }
      }
    },
  })
  gesture.enable()
  onUnmounted(() => {
    gesture.destroy()
  })
})
</script>
<template>
  <div class="flex items-center gap-2">
    <button
      class="h-10 w-10 i-uil:angle-left-b disabled:text-green-dark/50"
      :disabled="currentHatIndex === 0"
      @click="prev"
    ></button>
    <div
      class="flex-grow bg-theme rounded-full aspect-square overflow-hidden relative"
    >
      <div
        ref="el"
        class="absolute h-full top-0 left-0 flex"
        :class="{
          'transition duration-200': !isDragging,
        }"
        :style="{
          width: hats.length * 100 + '%',
          transform: `translateX(calc(-${
            (currentHatIndex * 100) / hats.length
          }% + ${additionalTranslateValue}px))`,
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
    <button
      class="w-10 h-10 i-uil:angle-right-b disabled:text-green-dark/50"
      :disabled="currentHatIndex === hats.length - 1"
      @click="next"
    ></button>
  </div>
</template>
