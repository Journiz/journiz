import {
  usePocketBase,
  useRealtimeTeam,
  useRealtimeTrip,
} from '@journiz/composables'
import { defineStore } from 'pinia'
import { useIntervalFn, useStorage } from '@vueuse/core'
import { Trip } from '@journiz/api-types'
import { computed, watch } from 'vue'
import { Device } from '@capacitor/device'
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
    refresh: refreshTrip,
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
    refresh: refreshTeam,
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
  const createTeam = async (members: string[]) => {
    if (!trip.value) {
      return false
    }
    const existingTeamsNum = trip.value.expand?.teams?.length ?? 0
    const teamDefaultName = 'Equipe ' + (existingTeamsNum + 1)
    const team = await pb.collection('team').create({
      name: teamDefaultName,
      members,
      trip: trip.value.id,
    })
    if (team) {
      await joinTeam(team.id)
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

  const refreshAll = () => Promise.all([refreshTrip(), refreshTeam()])

  const reporting = useIntervalFn(
    async () => {
      const batteryInfo = await Device.getBatteryInfo()
      const level = Math.round((batteryInfo.batteryLevel ?? 0) * 100)
      if (team.value && team.value?.batteryLevel !== level) {
        team.value.batteryLevel = level
        await saveTeam()
      }
    },
    10 * 1000,
    { immediate: false, immediateCallback: true }
  )
  const startReportingBattery = () => {
    reporting.resume()
  }
  const stopReportingBattery = () => {
    reporting.pause()
  }

  return {
    trip,
    joinTrip,
    team,
    joinTeam,
    createTeam,
    logout,
    saveTeam,
    refreshAll,
    conversationId: storedConversationId,
    journey,
    startReportingBattery,
    stopReportingBattery,
  }
})
