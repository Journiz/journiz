<script lang="ts" setup>
import { computed } from 'vue'
import { Point } from '../../../packages/api-types'

const props = defineProps<{
  points: Point[]
}>()

const numbersOfNoLocationPoints = computed(() => {
  return (
    props.points.length -
    props.points.filter((point) => point.hasLocation).length
  )
})
</script>
<template>
  <div class="bg-white rounded-lg drop-shadow-md p-2 flex items-center">
    <div
      class="relative w-8 h-8 rounded-full shadow-lg overflow-hidden flex items-center justify-center mr-2"
    >
      <div class="w-full h-full absolute top-0 left-0 bg-green-dark/15"></div>
      <div
        class="h-4 w-4 rounded-full bg-green-dark/80 text-6 color-white flex items-center justify-center"
      >
        <div class="i-uil:question"></div>
      </div>
    </div>
    <span>{{ numbersOfNoLocationPoints }} sans emplacements</span>
  </div>
</template>
