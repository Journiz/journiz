<script setup lang="ts">
import SquareButton from '~/components/SquareButton.vue'
import JourneyLine from '~/components/JourneyLine.vue'
const testAction = () => {
  console.log('🌼 Click on button')
}
</script>

<template>
  <article>
    BONJOUR C4EST MES PARCOURS
    <JourneyLine
      journey-name="Sortie à Grenoble"
      basecamp-name="Hôtel de ville"
    />
    <square-button :action="testAction" icon="play" />
  </article>
</template>
