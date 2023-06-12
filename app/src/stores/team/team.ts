import {
  usePocketBase,
  useRealtimeTeam,
  useRealtimeTrip,
} from '@journiz/composables'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Trip } from '@journiz/api-types'
import { computed, watch } from 'vue'
import useRefStorage from '../../composables/useRefStorage'
import { setNotificationsId } from '~/plugins/pushNotifications'

/**
 * This store handles storage needed for teams: their team object and a trip object
 */
export const useTeamStore = defineStore('team', () => {
  const pb = usePocketBase()

  /**
   * Trip stuff
   */
  const storedTripId = useStorage<string | null>('team-trip-id', null)
  const {
    data: trip,
    // refresh,
    // loading,
    // update,
    // updateLoading,
    setId: setTripId,
  } = useRealtimeTrip(storedTripId.value)
  useRefStorage(trip, 'team-trip-data')

  const joinTrip = async (shortId: string) => {
    try {
      const result: Trip = await pb
        .collection('trip')
        .getFirstListItem(`shortId="${shortId}"`)
      if (result) {
        trip.value = result
        storedTripId.value = result.id
        await setTripId(result.id)
        return true
      }
    } catch (e) {
      return false
    }
  }

  /**
   * Team stuff
   */
  const storedTeamId = useStorage<string | null>('team-id', null)

  const {
    data: team,
    // refresh,
    // loading,
    update: saveTeam,
    // updateLoading,
    setId: setTeamId,
  } = useRealtimeTeam(storedTeamId.value)
  useRefStorage(team, 'team-data')

  const joinTeam = async (id: string) => {
    try {
      await setTeamId(id)
      storedTeamId.value = id
      setNotificationsId(id)
      return true
    } catch (e) {
      return false
    }
  }

  const logout = async () => {
    storedTripId.value = null
    trip.value = null
    storedTeamId.value = null
    team.value = null
    setNotificationsId(null)

    // unsubscribe all events
    await setTripId(undefined)
    await setTeamId(undefined)
  }

  const storedConversationId = useStorage<string | null>(
    'team-conversation-id',
    null
  )
  watch(storedTeamId, async (id) => {
    try {
      const conversation = await pb
        .collection('conversation')
        .getFirstListItem('team="' + id + '"')
      if (conversation) {
        storedConversationId.value = conversation.id
      } else {
        storedConversationId.value = null
      }
    } catch (e) {
      storedConversationId.value = null
    }
  })

  const journey = computed(() => trip.value?.expand?.journey)

  return {
    trip,
    joinTrip,
    team,
    joinTeam,
    logout,
    saveTeam,
    conversationId: storedConversationId,
    journey,
  }
})
