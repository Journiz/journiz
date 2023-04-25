<script lang="ts" setup="">
import { useRouter } from 'vue-router'
import PointList from '~/components/PointList.vue'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import { useJourneyStore } from '~/stores/journey'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
// import JourneyData from '~/components/journey/JourneyData.vue'
const store = useJourneyStore()
const router = useRouter()
</script>
<template>
  <div class="pt10 px-16">
    <CustomHeader :title="store.journey.name" :no-display-return="true">
      <DefaultButton @click="router.push({ name: 'export-journey' })"
        >Export</DefaultButton
      >
    </CustomHeader>
    <PointList />
    <!-- <JourneyData /> -->
  </div>
</template>
