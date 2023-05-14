<script setup lang="ts">
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import { useJourneys, usePocketBase } from '@journiz/composables'
// import { useJourneyStore } from '~/stores/journey'
import FormCreatePointFirstStep from '~/components/point/FormCreatePointFirstStep.vue'
import PageTitle from '~/components/PageTitle.vue'
// import DefaultButton from '~/components/DefaultButton.vue'
</script>

<template>
  <article class="pt-10 px-16">
    <page-title class="mb-10">Créer un nouveau point</page-title>
    <FormCreatePointFirstStep />
  </article>
</template>
