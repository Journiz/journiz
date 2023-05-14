<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import MapWithSearch from '~/components/MapWithSearch.vue'
import { Coordinates } from '~/types/Coordinates'

const router = useRouter()
const store = useJourneyStore()

const setBasecamp = async (coords: Coordinates) => {
  await store.setBasecamp(coords[0], coords[1])
}
const confirm = () => router.push({ name: 'edit-journey' })
const pointCoords = computed(() => {
  return store.journey!.basecampLongitude && store.journey!.basecampLatitude
    ? [store.journey!.basecampLongitude, store.journey!.basecampLatitude]
    : undefined
})
</script>
<template>
  <div class="w-full h-full flex flex-col">
    <h1>Création du point de ralliement</h1>
    <DefaultButton @click="confirm">Suivant</DefaultButton>
    <MapWithSearch
      :initial-coords="pointCoords"
      :map-center="pointCoords"
      :zoom="16"
      @update="setBasecamp"
    />
  </div>
</template>
