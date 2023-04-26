<script setup>
import { computed, ref } from 'vue'
import { useJourneyStore } from '~/stores/journey'

const time = ref('00:00')
const security = ref(false)

const exportJourney = async () => {
  const success = await journeyStore.exportJourney(time.value, security.value)
  if (success) {
    await router.push('/dashboard/parcours')
  }
}

const journeyStore = useJourneyStore()
</script>
<template>
  <div>
    <div class="form-group mb-8">
      <label class="font-semibold text-blue-700 mr-8" for="export-time"
        >Régler la durée du parcours
      </label>
      <input
        id="export-time"
        v-model="time"
        type="time"
        @input="exportJourney"
      />
    </div>
    <div class="form-group">
      <label class="font-semibold text-blue-700 mr-8" for="export-security"
        >Activer le périmètre de sécurité</label
      >
      <input
        id="export-security"
        v-model="security"
        type="checkbox"
        @input="exportJourney"
      />
    </div>
    {{ journeyStore.journey?.safeZone }}
  </div>
</template>
