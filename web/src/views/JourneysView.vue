<script setup lang="ts">
import JourneyLine from '~/components/JourneyLine.vue'
import PageTitle from '~/components/PageTitle.vue'
import DefaultButton from '~/components/DefaultButton.vue'
const testAction = () => {
  console.log('🌼 Click on button')
}
</script>

<template>
  <article class="pt-10 px-16">
    <page-title class="mb-10">Mes parcours</page-title>
    <default-button class="mb-6" :action="testAction"
      >Nouveau parcours</default-button
    >
    <JourneyLine
      journey-name="Sortie à Grenoble"
      basecamp-name="Hôtel de ville"
    />
  </article>
</template>
