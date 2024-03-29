import { defineStore } from 'pinia'
import {
  usePocketBase,
  useRealtimeTripForGameMaster,
} from '@journiz/composables'
import { computed, ref } from 'vue'
import { User } from '@journiz/api-types'
import { useStorage } from '@vueuse/core'
import useRefStorage from '../composables/useRefStorage'
import { setNotificationsId } from '~/plugins/pushNotifications'

export const useUserStore = defineStore('user', () => {
  const pb = usePocketBase()
  const isLoggedIn = () => pb.authStore.isValid
  const user = ref<User | null>(
    isLoggedIn() ? (pb.authStore.model as unknown as User) : null
  )
  const authRefresh = async () => {
    try {
      await pb.collection('users').authRefresh()
      if (pb.authStore.isValid) {
        user.value = pb.authStore.model as unknown as User
      }
    } catch (e) {
      console.info('🚶- No user logged in.')
    }
  }
  const login = async (username: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(username, password)
      if (pb.authStore.isValid) {
        user.value = pb.authStore.model as unknown as User
        setNotificationsId(user.value.id)
        return true
      }
    } catch (e) {
      console.error('ERROR: ' + e)
    }
    return false
  }

  /**
   * Trip persistence
   */
  const storedTripId = useStorage<string | null>('user-trip-id', null)
  const {
    data: trip,
    setId: setTripId,
    update: updateTrip,
  } = useRealtimeTripForGameMaster(storedTripId.value)
  useRefStorage(trip, 'user-trip-data')
  const setTrip = async (tripId: string) => {
    try {
      storedTripId.value = tripId
      await setTripId(tripId)
      return true
    } catch (e) {
      return false
    }
  }

  const journey = computed(() => trip.value?.expand?.journey)

  const logout = () => {
    pb.authStore.clear()
    user.value = null
    storedTripId.value = null
    trip.value = null
    setNotificationsId(null)
  }

  const startTrip = async () => {
    if (trip.value) {
      trip.value.status = 'playing'
      await updateTrip()
    }
  }
  const endTrip = async () => {
    if (trip.value) {
      trip.value.status = 'finishing'
      await updateTrip()
    }
  }
  const showTripScores = async () => {
    if (trip.value) {
      trip.value.status = 'finished'
      await updateTrip()
    }
  }

  return {
    user,
    refresh: authRefresh,
    login,
    isLoggedIn,
    logout,
    trip,
    setTrip,
    journey,
    startTrip,
    endTrip,
    showTripScores,
  }
})
