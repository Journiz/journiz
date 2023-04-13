<script lang="ts" setup="">
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useJourneyStore } from '~/stores/journey'
import { waitForEndLoading } from '~/utils/waitForEndLoading'

const store = useJourneyStore()
store.setId(useRoute().params.journeyId as string)

const { loading } = storeToRefs(store)
await waitForEndLoading(loading)
</script>
<template>
  <RouterView v-if="store.journey" />
</template>
