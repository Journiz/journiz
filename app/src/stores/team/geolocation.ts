import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { useTeamStore } from './team'
import { backgroundGeolocation } from '~/plugins/capacitorSetup'

export const useGeolocationStore = defineStore('geolocation', () => {
  const currentLocation = reactive({ lng: 6.129384, lat: 45.899247 })

  let watcherId: string | null = null
  const startWatching = () => {
    if (watcherId) return
    backgroundGeolocation
      .addWatcher(
        {
          backgroundMessage: 'Cancel to prevent battery drain.',
          backgroundTitle: 'Tracking You.',
          requestPermissions: true,
        },
        function callback(location, error) {
          if (error) {
            if (error.code === 'NOT_AUTHORIZED') {
              if (
                window.confirm(
                  'This app needs your location, ' +
                    'but does not have permission.\n\n' +
                    'Open settings now?'
                )
              ) {
                // It can be useful to direct the user to their device's
                // settings when location permissions have been denied. The
                // plugin provides the 'openSettings' method to do exactly
                // this.
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
        await teamStore.update()
        console.log(
          '💾Saved change on server : [lat: ' +
            currentLocation.lat +
            ', lng: ' +
            currentLocation.lng +
            ']'
        )
      }
    })
  }
  const stopReporting = () => {
    unwatch?.()
    unwatch = null
  }

  return {
    startWatching,
    stopWatching,
    currentLocation,
    startReporting,
    stopReporting,
  }
})
