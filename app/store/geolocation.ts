import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation'

export const useGeolocationStore = defineStore('geolocation', () => {
  const backgroundLocation = useNuxtApp()
    .$geolocation as BackgroundGeolocationPlugin

  const currentLocation = reactive({ lng: 6.129384, lat: 45.899247 })
  let watcherId: string | null = null

  const startWatching = () => {
    if (watcherId) return
    backgroundLocation
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
                backgroundLocation.openSettings()
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
        /* backgroundLocation.removeWatcher({
        id: watcher_id
      }); */
        watcherId = id
      })
  }

  const stopWatching = () => {
    if (watcherId) {
      backgroundLocation.removeWatcher({
        id: watcherId,
      })
      watcherId = null
    }
  }
  return { startWatching, stopWatching, currentLocation }
})
