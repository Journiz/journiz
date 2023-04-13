<script lang="ts" setup="">
import { useRouter } from 'vue-router'
import JourneyData from '~/components/JourneyData.vue'
import PointList from '~/components/PointList.vue'

const router = useRouter()
</script>
<template>
  <div>
    <div>Ici l'éditeur avec la liste des points etc</div>
    <button @click="router.push({ name: 'export-journey' })">Export</button>
    <PointList />
    <!-- <JourneyData /> -->
  </div>
</template>
