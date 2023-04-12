<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useJourneyStore } from '../../stores/journey'
import { useRoute } from 'vue-router'
import { useJourney } from '@journiz/composables';

const invalidInput = ref(false)
const name = ref('')
const long = ref('')
const lat = ref('')

const store = useJourneyStore()

const setBasecamp = async () => {
  console.log('oui')
  const recordId = await store.setBasecamp(name.value, long.value, lat.value)
}
</script>

<template>
  <h1>Création du point de raliement</h1>
  
<form @submit.prevent="setBasecamp">
  <div class="form-group">
    <label for="name">Nom du parcours</label>
    <input
      id="name"
      v-model="name"
      type="text"
      placeholder="Mairie"
    />
  </div>
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
