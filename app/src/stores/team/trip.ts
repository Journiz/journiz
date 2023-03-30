import {
  useJourney,
  usePocketBase,
  useRealtimeJourney,
  useRealtimeTrip,
  useTrip,
} from '@journiz/composables'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Trip } from '@journiz/api-types'

export const useTripStore = defineStore('team-trip', () => {
  const pb = usePocketBase()

  const idRef = ref<string>()
  const joinTrip = async (shortId: string) => {
    try {
      const result: Trip = await pb
        .collection('trip')
        .getFirstListItem(`shortId="${shortId}"`)
      if (result) {
        // Setting idRef will trigger realtime composable and plug to data
        idRef.value = result.id
        return true
      }
    } catch (e) {
      return false
    }
  }

  const {
    data: trip,
    refresh,
    loading,
    update,
    updateLoading,
  } = useRealtimeTrip(idRef)

  const { data: journey } = useRealtimeJourney(
    computed(() => trip.value?.journey)
  )
  return {
    joinTrip,
    trip,
    journey,
    loading,
    updateLoading,
    update,
    refresh,
  }
})
