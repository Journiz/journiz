<script setup lang="ts">
  import { useJourney } from '@journiz/composables';
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id: any = route.query.id
  const {data: journey, loading} = useJourney(id)
  
  // console.log(journey.value)
  // console.log(test.data)
</script>

<template>
  <section>
    <h1>Data Journey</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="journey">
      <pre>{{ journey }}</pre>
    </div>
  </section>
</template>
