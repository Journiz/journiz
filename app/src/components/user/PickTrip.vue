<script lang="ts" setup="">
import {
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  loadingController,
} from '@ionic/vue'
import { computed, ref } from 'vue'
import { useTrips } from '@journiz/composables'
import { useUserStore } from '~/stores/user'

const emit = defineEmits(['tripChange'])
const userStore = useUserStore()
const {
  data: trips,
  loading,
  refresh,
} = useTrips({
  filter: `journey.user="${userStore.user?.id ?? ''}"`,
})
const isRefreshing = ref(false)
const handleRefresh = async (e: any) => {
  isRefreshing.value = true
  await refresh()
  isRefreshing.value = false
  e.target.complete()
}

const initialLoading = computed(() => loading.value && !isRefreshing.value)

const openTrip = async (tripId: string) => {
  const loading = await loadingController.create({
    message: 'Chargement du parcours...',
  })
  await loading.present()
  await userStore.setTrip(tripId)
  emit('tripChange')
  await loading.dismiss()
}
</script>
<template>
  <div>
    <ion-refresher slot="fixed" @ion-refresh="handleRefresh">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <div v-if="initialLoading" class="flex justify-center py-8">
      <ion-spinner />
    </div>
    <ion-list v-else>
      <ion-item
        v-for="trip in trips"
        :key="trip.id"
        button
        :detail="false"
        @click="openTrip(trip.id)"
      >
        <ion-label>{{ trip.name }}</ion-label>
      </ion-item>
    </ion-list>
  </div>
</template>
