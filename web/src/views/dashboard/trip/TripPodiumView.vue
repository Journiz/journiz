<script lang="ts" setup="">
import { useRealtimeTrip, useTripForGameMaster } from '@journiz/composables'
import { useRoute } from 'vue-router'

const id = useRoute().params.tripId
const { data: trip, loading, update } = useTripForGameMaster(id as string)
</script>
<template>
  <div v-if="!loading && trip" class="h-full p-5 overflow-y-auto">
    Ici le podium de ce trip,la data contient tout, y compris les réponses des
    équipes aux points :
    <pre>
      {{ trip }}
    </pre>
  </div>
  <div v-else class="p-5">Chargement du voyage...</div>
</template>
