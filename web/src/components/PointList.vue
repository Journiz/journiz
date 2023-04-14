<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useJourneys, usePocketBase } from '@journiz/composables'
import { useJourneyStore } from '~/stores/journey'
import PointItem from '~/components/PointItem.vue'
import PageTitle from '~/components/PageTitle.vue'
import DefaultButton from '~/components/DefaultButton.vue'

const store = useJourneyStore()
const router = useRouter()
const pb = usePocketBase()
const { data: journeys, refresh } = useJourneys()

// const deletePoint = async (id: string) => {
async function deletePoint(id: string) {
  console.log('delete point', id)
  try {
    await pb.collection('point').delete(id)
    await refresh()
  } catch (e) {
    console.log(e)
  }
}

const editPoint = async (id: string) => {
  console.log('edit point', id)
}
</script>

<template>
  <article class="pt-10 px-16">
    <page-title class="mb-10">Points</page-title>
    <default-button class="mb-6" @click="router.push('point/creation')"
      >Ajouter un point</default-button
    >
    <div v-if="store.loading">Chargement...</div>
    <div v-else-if="store.journey">
      <div class="flex flex-col gap-4">
        <!-- <pre>{{ store.journey.expand.points }}</pre> -->
        <PointItem
          v-for="point in store.journey.expand.points"
          :key="point.id"
          :point="point"
          @edit-point="
            $router.push({ name: 'edit-point', params: { pointId: point.id } })
          "
          @delete-point="deletePoint(point.id)"
        />
      </div>
    </div>
  </article>
</template>
