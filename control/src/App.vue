<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import Stepper from '@/components/Stepper.vue'

const tripId = useStorage('tripId', 'ydq57qnmy3n5gdp')
const refresh = () => {
  window.location.reload()
}
</script>
<template>
  <main class="w-full max-h-screen relative p-8 flex flex-col">
    <h1 class="text-3xl font-bold">Journiz control panel</h1>
    <div class="flex items-end gap-2">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Trip id?</span>
        </label>
        <input
          v-model="tripId"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <button class="btn btn-primary" @click="refresh">
        <span class="i-uil:sync"></span>
      </button>
    </div>
    <Stepper :trip-id="tripId" class="mt-4 flex-grow flex-shrink" />
  </main>
</template>

<style>
html,
body,
#app {
  @apply h-full;
}
</style>
