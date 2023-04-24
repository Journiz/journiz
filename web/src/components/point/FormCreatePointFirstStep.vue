<script setup lang="ts">
import { ref } from 'vue'
import router from '~/router'
import { useJourneyStore } from '~/stores/journey'

const name = ref('')
const long = ref()
const lat = ref()

const journeyStore = useJourneyStore()

const newPoint = async () => {
  const newPointId = await journeyStore.newPoint(
    name.value,
    long.value,
    lat.value
  )
  if (newPointId) {
    console.log('success')
    console.log(newPointId)
    router.push({ name: 'edit-point', params: { pointId: newPointId } })
  }
}
</script>

<template>
  <form @submit.prevent="newPoint">
    <div class="form-group">
      <label for="edit-name">Nom du point</label>
      <input id="edit-name" v-model="name" type="text" placeholder="name" />
    </div>
    <div class="form-group">
      <label for="edit-long">Nom du point</label>
      <input id="edit-long" v-model="long" type="number" placeholder="long" />
    </div>
    <div class="form-group">
      <label for="edit-lat">Nom du point</label>
      <input id="edit-lat" v-model="lat" type="number" placeholder="lat" />
    </div>
    <button>étape suivante</button>
  </form>
</template>
