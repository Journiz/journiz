<script setup lang="ts">
import { ref } from 'vue'
import { useJourneyStore } from '~/stores/journey'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import UilFileDownload from '~icons/uil/file-download'

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
    <div class="form-group mb-8">
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
    <div class="form-group">
      <label class="font-semibold text-blue-700 mr-8">
        Télécharger les documents à distribuer
      </label>
      <DefaultButton class="mt-3"
        ><UilFileDownload />Autorisations de sortie</DefaultButton
      >
      <DefaultButton class="mt-3"
        ><UilFileDownload />Tableau de bord papier</DefaultButton
      >
    </div>
    <div class="mt-4">{{ journeyStore.journey?.safeZone }}</div>
  </div>
</template>
