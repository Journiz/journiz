import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { backgroundGeolocation } from '../plugins/capacitorSetup'
import { useTeamStore } from './team/team'

export const useGeolocationStore = defineStore('geolocation', () => {
  const currentLocation = reactive({ lng: 6.129384, lat: 45.899247 })

  let watcherId: string | null = null
  const startWatching = () => {
    if (watcherId) return
    backgroundGeolocation
      .addWatcher(
        {
          backgroundTitle: 'Jeu en cours',
          backgroundMessage:
            "La partie Journiz est en cours de déroulement, merci de ne pas quitter l'app.",
          requestPermissions: true,
        },
        function callback(location, error) {
          if (error) {
            if (error.code === 'NOT_AUTHORIZED') {
              if (
                window.confirm(
                  'Nous avons besoin de ta localisation durant le jeu, mais tu as bloqué la permission. Ouvrir les réglages ?'
                )
              ) {
                backgroundGeolocation.openSettings()
              }
            }
            return console.error(error)
          }
          if (location) {
            currentLocation.lng = location.longitude
            currentLocation.lat = location.latitude
          } else {
            console.error('Location object from OS was empty')
          }
          return '' // console.log(location);
        }
      )
      .then(function watcherAdded(id: string) {
        // When a watcher is no longer needed, it should be removed by calling
        // 'removeWatcher' with an object containing its ID.
        /* backgroundGeolocation.removeWatcher({
        id: watcher_id
      }); */
        watcherId = id
      })
  }

  const stopWatching = () => {
    if (watcherId) {
      stopReporting()
      backgroundGeolocation.removeWatcher({
        id: watcherId,
      })
      watcherId = null
    }
  }

  const teamStore = useTeamStore()
  let unwatch: (() => void) | null = null
  const startReporting = () => {
    if (unwatch) {
      return false
    }
    unwatch = watch(currentLocation, async () => {
      // Save the positon on server
      if (teamStore.team) {
        teamStore.team.longitude = currentLocation.lng
        teamStore.team.latitude = currentLocation.lat
        await teamStore.saveTeam()
        console.log(
          '💾Saved change on server : [lat: ' +
            currentLocation.lat +
            ', lng: ' +
            currentLocation.lng +
            ']'
        )
      } else {
        stopReporting()
      }
    })
  }
  const stopReporting = () => {
    unwatch?.()
    unwatch = null
    console.log('🛑 Stopped reporting location')
  }

  function requestPermission() {
    backgroundGeolocation
      .addWatcher(
        {
          requestPermissions: true,
          stale: true,
        },
        function (location, error) {
          if (error) {
            if (error.code === 'NOT_AUTHORIZED') {
              if (
                window.confirm(
                  'Nous avons besoin de ta localisation durant le jeu, mais tu as bloqué la permission. Ouvrir les réglages ?'
                )
              ) {
                backgroundGeolocation.openSettings()
              }
            }
            return console.error(error)
          }
          console.log('location requested.')
        }
      )
      .then(function (id) {
        backgroundGeolocation.removeWatcher({ id })
      })
  }

  return {
    startWatching,
    stopWatching,
    currentLocation,
    startReporting,
    stopReporting,
    requestPermission,
  }
})
