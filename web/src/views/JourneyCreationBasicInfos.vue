<script setup lang="ts">
import { useRouter } from 'vue-router'
import CustomHeader from '~/components/CustomHeader.vue'
import DefaultButton from '~/components/DefaultButton.vue'
import JourneyFormGeneral from '~/components/JourneyFormGeneral.vue'
const router = useRouter()
</script>
<template>
  <CustomHeader title="Informations du nouveau parcours" class="mb-8">
    <default-button @click="router.push('modele')">Suivant</default-button>
  </CustomHeader>
  <JourneyFormGeneral />
</template>
