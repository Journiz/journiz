<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
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
    duration: 0.4,
    ease: 'power4.inOut',
    absolute: true,
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
  onUnmounted(() => {
    gesture.destroy()
  })
})
</script>
<template>
  <div
    :style="{
      height: closedHeight + 'px',
    }"
  >
    <div
      class="fixed inset-0 z-100 bg-white/20 transition-opacity duration-300"
      :class="{
        'pointer-events-none opacity-0': !isOpen,
      }"
      :style="{
        backdropFilter: isOpen
          ? `blur(${23 - Math.abs(translateValue * 0.04)}px)`
          : 'blur(0px)',
      }"
      @click="close"
    >
      <div
        class="absolute top-safe left-0 w-full text-3xl flex items-center p-4 text-black gap-4"
      >
        <span class="i-uil:multiply"></span>
        <div>
          <slot name="header"></slot>
        </div>
      </div>
    </div>
    <div
      :class="
        isOpen
          ? 'fixed w-full top-1/2 left-1/2 transform -translate-1/2 p-4 z-100 image-shadow'
          : 'relative z-10 delay-z'
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
.delay-z {
  transition: z-index 0s 0.3s;
}
.image-shadow {
  filter: drop-shadow(0px 0px 25px #0000004f);
}
</style>
