<script setup lang="ts">
import CustomHeader from '~/components/CustomHeader.vue'
import DefaultButton from '~/components/DefaultButton.vue'
</script>
<template>
  <CustomHeader title="Informations du nouveau parcours">
    <default-button @click="console.log('TODO')">Suivant</default-button>
  </CustomHeader>
</template>
