<script lang="ts" setup="">
import { useRoute } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'

const store = useJourneyStore()
store.setId(useRoute().params.journeyId as string)
</script>
<template>
  <RouterView v-if="store.journey" />
</template>
