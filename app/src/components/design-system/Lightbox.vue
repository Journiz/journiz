<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { Flip } from 'gsap/Flip'
import { createGesture } from '@ionic/core'
import gsap from 'gsap'

const isOpen = ref(false)
const translateValue = ref(0)
const el = ref()
const closedHeight = ref()
const open = () => {
  closedHeight.value = el.value.offsetHeight
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
  translateValue.value = 0
}
watch(isOpen, async () => {
  const state = Flip.getState(el.value)
  await nextTick()
  await Flip.from(state, {
    duration: 0.3,
    ease: 'power3.inOut',
  })
})

onMounted(() => {
  const gesture = createGesture({
    el: el.value,
    gestureName: 'swipeToClose',
    threshold: 0,
    onMove: (detail) => {
      if (!isOpen.value) return
      translateValue.value = detail.deltaY
    },
    onEnd: (detail) => {
      if (!isOpen.value) return
      if (Math.abs(detail.deltaY) > 150) {
        close()
      } else {
        gsap.to(translateValue, {
          value: 0,
          duration: 0.3,
          ease: 'power3.inOut',
        })
      }
    },
  })
  gesture.enable()
})
</script>
<template>
  <div
    :style="{
      height: closedHeight + 'px',
    }"
  >
    <transition name="lb-fade">
      <div
        v-show="isOpen"
        class="fixed bg-black/70 inset-0 z-100"
        @click="close"
      >
        <div
          class="absolute top-26 right-2 text-3xl i-uil:multiply text-white"
        ></div>
      </div>
    </transition>
    <div
      :class="
        isOpen
          ? 'fixed w-full top-1/2 left-1/2 transform -translate-1/2 p-4 z-100'
          : 'relative z-10'
      "
      @click="open"
    >
      <div
        ref="el"
        :style="{
          marginTop: translateValue * 1.8 + 'px',
        }"
      >
        <slot :is-open="isOpen" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.2s ease;
}

.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}
</style>
