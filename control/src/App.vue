<script setup lang="ts">
import Stepper from '@/components/Stepper.vue'
</script>
<template>
  <main class="w-full min-h-full p-8 flex flex-col">
    <h1 class="text-3xl font-bold">Journiz control panel</h1>
    <Stepper class="mt-4 flex-grow" />
  </main>
</template>

<style>
html,
body,
#app {
  @apply h-full;
}
</style>
