<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import MapWithSearch from '~/components/MapWithSearch.vue'
import { Coordinates } from '~/types/Coordinates'
import CustomHeader from '~/components/layout/CustomHeader.vue'

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
  <div class="flex flex-col h-full">
    <CustomHeader
      title="Création du point de ralliement"
      class="px-16 h-auto mb-7 pt-12"
    >
      <DefaultButton @click="confirm">Valider</DefaultButton>
    </CustomHeader>
    <div class="px-16 h-auto mb-7 h-full">
      <MapWithSearch
        :initial-coords="pointCoords as any"
        :map-center="pointCoords as any"
        :zoom="16"
        @update="setBasecamp"
      />
    </div>
  </div>
</template>
