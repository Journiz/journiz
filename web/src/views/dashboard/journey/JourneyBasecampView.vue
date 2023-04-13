<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'

const invalidInput = ref(false)
const long = ref('')
const lat = ref('')

const router = useRouter()
const store = useJourneyStore()

const setBasecamp = async () => {
  const success = await store.setBasecamp(
    parseFloat(long.value),
    parseFloat(lat.value)
  )
  if (success) {
    console.log('redirection')
    router.push('/dashboard/parcours/' + journey.id)
  }
}
</script>
<template>
  <h1>Création du point de raliement</h1>
  <form @submit.prevent="setBasecamp">
    <div class="form-group">
      <label for="long">Longitude</label>
      <input id="long" v-model="long" type="number" />
    </div>
    <div class="form-group">
      <label for="lat">Latitude</label>
      <input id="lat" v-model="lat" type="number" />
    </div>
    <p v-if="invalidInput">Merci de saisir tous les champs</p>
    <button>Suivant</button>
  </form>
</template>
