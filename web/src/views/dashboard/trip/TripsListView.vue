<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTrips } from '@journiz/composables'
import PageTitle from '~/components/PageTitle.vue'
import { useUserStore } from '~/stores/user'
import { waitForEndLoading } from '~/utils/waitForEndLoading'
import TripItem from '~/components/trip/TripItem.vue'

const router = useRouter()
const userStore = useUserStore()

const { data: trips, loading } = useTrips({
  filter: `journey.user="${userStore.user!.id}" && status="finished"`,
  sort: '-created',
  expand: 'journey',
})

const openPodium = (id: string) => {
  router.push({ name: 'trip-podium', params: { tripId: id } })
}
const openTrip = (id: string) => {
  router.push({ name: 'trip-settings', params: { tripId: id } })
}
await waitForEndLoading(loading)
</script>

<template>
  <article class="pt-10 px-16">
    <page-title class="mb-10">Historique des sorties</page-title>
    <div v-if="trips?.length" class="flex flex-col gap-4">
      <TripItem
        v-for="trip in trips"
        :key="trip.id"
        :trip="trip"
        @open-trip="openTrip(trip.id)"
        @open-podium="openPodium(trip.id)"
      />
    </div>
    <p v-else>Vous n'avez encore terminé aucune sortie.</p>
  </article>
</template>
