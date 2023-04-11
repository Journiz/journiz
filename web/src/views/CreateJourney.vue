<script setup lang="ts">
import CustomHeader from '~/components/CustomHeader.vue'
import DefaultButton from '~/components/DefaultButton.vue'
import JourneyFormGeneral from '~/components/JourneyFormGeneral.vue'
</script>
<template>
  <CustomHeader title="Informations du nouveau parcours" class="mb-8">
    <default-button @click="console.log('TODO')">Suivant</default-button>
  </CustomHeader>
  <JourneyFormGeneral />
</template>
