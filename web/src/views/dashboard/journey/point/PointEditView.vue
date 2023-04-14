<script setup lang="ts">
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import { useJourneys, usePocketBase } from '@journiz/composables'
// import { useJourneyStore } from '~/stores/journey'
// import PointItem from '~/components/PointItem.vue'
import PageTitle from '~/components/PageTitle.vue'
// import DefaultButton from '~/components/DefaultButton.vue'

const name = ref('')
const long = ref('')
const lat = ref('')
const editPoint = async (id: string) => {
  console.log('edit point', id)
}
</script>

<template>
  <article class="pt-10 px-16">
    <page-title class="mb-10">Editer le point</page-title>
    <form @submit.prevent="editPoint">
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
  </article>
</template>
