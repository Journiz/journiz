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
  expand: 'journey',
})
const isRefreshing = ref(false)

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
    <div v-if="initialLoading" class="flex justify-center py-8">
      <ion-spinner />
    </div>
    <div v-else class="grid grid-cols-2 grid-rows-auto trips-container gap-3">
      <div
        v-for="trip in trips"
        :key="trip.id"
        class="trip-item flex items-center bg-red color-white rounded-xl px-4 py-3 justify-center w-full [&:nth-child(4n-1)]:bg-green [&:nth-child(4n-2)]:bg-green"
        @click="openTrip(trip.id)"
      >
        <div class="text-center flex flex-col items-center">
          <div class="text-base font-medium">{{ trip.name }}</div>
          <div class="flex items-center w-fit">
            <div class="i-uil:map-pin-alt mr-2 h-4 text-base"></div>
            <div class="text-left">
              {{ trip.expand?.journey?.basecampName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.trips-container {
  grid-auto-rows: 1fr;
}
</style>
