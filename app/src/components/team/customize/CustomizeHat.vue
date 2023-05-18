<script lang="ts" setup="">
import { ref } from 'vue'
import Button from '~/components/design-system/Button.vue'

const emit = defineEmits(['next'])
const hats = ['crown', 'headset', 'party', 'bucket']
const currentHat = ref(0)
const next = () => {
  currentHat.value = (currentHat.value + 1) % hats.length
}
const prev = () => {
  if (currentHat.value === 0) {
    currentHat.value = hats.length - 1
  } else {
    currentHat.value--
  }
}
</script>
<template>
  <div class="flex flex-col text-center">
    <h1 class="text-2xl font-black">
      Que seraient des voyageurs sans couvre-chef ?
    </h1>
    <p class="text-sm">Choisissez un couvre-chef qui vous représente</p>
    <div class="my-auto flex items-center gap-2">
      <button class="h-10 w-10 i-uil:angle-left-b" @click="prev"></button>
      <div
        class="flex-grow bg-theme rounded-full aspect-square overflow-hidden relative"
      >
        <div
          class="absolute h-full top-0 left-0 flex transition duration-200"
          :style="{
            width: hats.length * 100 + '%',
            transform: 'translateX(-' + (currentHat * 100) / hats.length + '%)',
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
    <div class="mt-auto">
      <Button class="w-full" @click="emit('next')">Suivant</Button>
    </div>
  </div>
</template>
