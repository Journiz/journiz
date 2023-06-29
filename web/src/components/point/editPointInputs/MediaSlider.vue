<script setup lang="ts">
import { ref, watch } from 'vue'

const imagesNum = 7
const currentImageIndex = defineModel<number>({
  default: 0,
})
defineProps({
  label: {
    type: String,
    default: null,
  },
})
const next = () => {
  if (currentImageIndex.value === imagesNum - 1) {
    currentImageIndex.value = 0
  } else {
    currentImageIndex.value++
  }
}
const prev = () => {
  if (currentImageIndex.value === 0) {
    currentImageIndex.value = imagesNum - 1
  } else {
    currentImageIndex.value--
  }
}

const transition = ref('next-step')
watch(currentImageIndex, (to: number, from: number) => {
  transition.value = to > from ? 'next-step' : 'prev-step'
})
</script>
<template>
  <div>
    <label v-if="label" class="text-black font-medium">{{ label }}</label>
    <div
      class="relative bg-white rounded-lg custom-shadow overflow-hidden py-3 mt-2"
    >
      <div class="h-40 relative">
        <transition :name="transition">
          <div
            :key="currentImageIndex"
            class="item absolute top-0 left-0 h-full w-full"
          >
            <img
              class="object-contain h-full w-full"
              :src="`/fallback-images/${currentImageIndex}.png`"
            />
          </div>
        </transition>
      </div>
      <div class="controls">
        <button
          class="cursor-pointer absolute transform -translate-y-1/2 top-1/2 left-4 rotate-90 p-2"
          @click="prev"
        >
          <img
            src="../../../assets/images/svg/arrow-select.svg"
            alt="Fleche précédent"
          />
        </button>
        <button
          class="cursor-pointer absolute transform -translate-y-1/2 top-1/2 right-4 -rotate-90 p-2"
          @click="next"
        >
          <img
            src="../../../assets/images/svg/arrow-select.svg"
            alt="Fleche suivant"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.next-step-enter-active,
.next-step-leave-active,
.prev-step-enter-active,
.prev-step-leave-active {
  @apply transition duration-300 ease-out-quart;
}

.next-step-enter-from,
.prev-step-leave-to {
  transform: translateX(100%);
}

.next-step-leave-to,
.prev-step-enter-from {
  transform: translateX(-100%);
}

.custom-shadow {
  filter: drop-shadow(0px 1px 2px rgba(0, 35, 30, 0.16));
}
</style>
