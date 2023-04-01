import {
  usePocketBase,
  useRealtimeJourney,
  useRealtimeTrip,
} from '@journiz/composables'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { Trip } from '@journiz/api-types'
import { useStorage } from '@vueuse/core'
import useRefStorage from '../../composables/useRefStorage'

export const useTripStore = defineStore('team-trip', () => {
  const pb = usePocketBase()

  const idRef = useStorage<string | undefined>('team-trip-id', undefined)
  const {
    data: trip,
    refresh,
    loading,
    update,
    updateLoading,
  } = useRealtimeTrip(idRef)

  useRefStorage(trip, 'team-trip-data')

  const joinTrip = async (shortId: string) => {
    try {
      const result: Trip = await pb
        .collection('trip')
        .getFirstListItem(`shortId="${shortId}"`)
      if (result) {
        // Setting idRef will trigger realtime composable and plug to data
        trip.value = result
        idRef.value = result.id
        return true
      }
    } catch (e) {
      return false
    }
  }

  const { data: journey } = useRealtimeJourney(
    computed(() => trip.value?.journey)
  )
  return {
    joinTrip,
    journey,
    loading,
    refresh,
    trip,
    update,
    updateLoading,
  }
})
