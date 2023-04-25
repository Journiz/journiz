<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'
import MapWithSafeZone from '~/components/MapWithSafeZone.vue'

const time = ref('00:00')
const security = ref(false)

const journeyStore = useJourneyStore()
const router = useRouter()

const exportJourney = async () => {
  const success = await journeyStore.exportJourney(time.value, security.value)
  if (success) {
    await router.push('/dashboard/parcours')
  }
}
const updateGeometry = async (geo: any) => {
  if (journeyStore.journey) {
    journeyStore.journey.safeZone = geo
    await journeyStore.update()
  }
}
</script>

<template>
  <div class="px-16 pt-10 h-full flex flex-col">
    <h1>Exporter</h1>
    <form @submit.prevent="exportJourney">
      <div class="form-group">
        <label for="export-time">Régler la durée du parcours </label>
        <input id="export-time" v-model="time" type="time" />
      </div>
      <div class="form-group">
        <label for="export-security">Activer le périmètre de sécurité</label>
        <input id="export-security" v-model="security" type="checkbox" />
      </div>
      {{ journeyStore.journey?.safeZone }}
      <button>Valider</button>
    </form>
    <MapWithSafeZone
      class="flex-grow"
      :map-center="[journeyStore.journey!.basecampLongitude, journeyStore.journey!.basecampLatitude]"
      @safeAreaGeometry="updateGeometry"
    />
  </div>
</template>
