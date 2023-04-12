<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useJourneyStore } from '../stores/journey'
import JourneyData from '~/components/JourneyData.vue'
import FormSetBasecamp from '~/components/Journey/FormSetBasecamp.vue'
const store = useJourneyStore()

store.setId(useRoute().query.id as string)
</script>

<template>
  <main>
    <h1>Config Journey</h1>
    <JourneyData />
    <!--    <FormSetBasecamp v-if="store.journey" />-->
  </main>
</template>
