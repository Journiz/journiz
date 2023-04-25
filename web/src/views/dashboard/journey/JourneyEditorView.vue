<script lang="ts" setup="">
import { useRouter } from 'vue-router'
import PointList from '~/components/PointList.vue'
// import JourneyData from '~/components/journey/JourneyData.vue'

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
