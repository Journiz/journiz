<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'

const time = ref('00:00')
const security = ref(false)

const journeyStore = useJourneyStore()
const router = useRouter()

const exportJourney = async () => {
  const success = await journeyStore.exportJourney(time.value, security.value)
  if (success) {
    router.push('/dashboard/parcours')
  }
}
</script>

<template>
  <div>
    <h1>Export view</h1>
    <form @submit.prevent="exportJourney">
      <div class="form-group">
        <label for="export-time">Régler la durée du parcours </label>
        <input id="export-time" v-model="time" type="time" />
      </div>
      <div class="form-group">
        <label for="export-security">Activer le périmètre de sécurité</label>
        <input id="export-security" v-model="security" type="checkbox" />
      </div>
      <button>Valider</button>
    </form>
  </div>
</template>
