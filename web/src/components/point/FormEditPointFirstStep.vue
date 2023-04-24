<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useJourneys, usePocketBase } from '@journiz/composables'
import FormEditPointFirstStep from '~/components/point/FormEditPointFirstStep.vue'
import PageTitle from '~/components/PageTitle.vue'

const name = ref('')
const long = ref('')
const lat = ref('')

const pb = usePocketBase()
const pointId = useRoute().params.pointId as string
console.log(pointId)

let point: any
onMounted(async () => {
  try {
    point = await pb.collection('point').getOne(pointId)
    console.log(point)
    name.value = point.name
    long.value = point.longitude
    lat.value = point.latitude
  } catch (e) {
    console.log(e)
  }
})

async function saveUpdatePoint() {
  point.name = name.value
  point.long = long.value
  point.latitude = lat.value
  try {
    await pb.collection('point').update(point.id, point)
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <form @submit.prevent="saveUpdatePoint">
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
