<script setup lang="ts">
import SquareButton from '~/components/SquareButton.vue'
const testAction = () => {
  console.log('🌼 Click on button')
}
</script>

<template>
  <article>
    BONJOUR C4EST MES PARCOURS
    <square-button :action="testAction" icon="play" />
  </article>
</template>
