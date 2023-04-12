<script setup lang="ts">
import { useJourneyStore } from '~/stores/journey'

const store = useJourneyStore()

// console.log(journey.value)
// console.log(test.data)
</script>

<template>
  <section>
    <h1>Data Journey</h1>
    <div v-if="store.loading">Chargement...</div>
    <div v-else-if="store.journey">
      <pre>{{ store.journey }}</pre>
    </div>
  </section>
</template>
