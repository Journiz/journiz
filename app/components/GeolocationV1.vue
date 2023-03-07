<script lang="ts" setup>
import {registerPlugin} from "@capacitor/core";
const BackgroundGeolocation = registerPlugin("BackgroundGeolocation");

console.log(BackgroundGeolocation)

const triggerGeolocation = () => {
  BackgroundGeolocation.addWatcher(
      {
        backgroundMessage: "Cancel to prevent battery drain.",
        backgroundTitle: "Tracking You.",
        requestPermissions: true,
      },
      function callback(location, error) {
        if (error) {
          if (error.code === "NOT_AUTHORIZED") {
            if (window.confirm(
                "This app needs your location, " +
                "but does not have permission.\n\n" +
                "Open settings now?"
            )) {
              // It can be useful to direct the user to their device's
              // settings when location permissions have been denied. The
              // plugin provides the 'openSettings' method to do exactly
              // this.
              BackgroundGeolocation.openSettings();
            }
          }
          return console.error(error);
        }

        return console.log(location);
      }
  ).then(function after_the_watcher_has_been_added(watcher_id) {
    // When a watcher is no longer needed, it should be removed by calling
    // 'removeWatcher' with an object containing its ID.
    /* BackgroundGeolocation.removeWatcher({
      id: watcher_id
    }); */
  });
}

</script>
<template>

  <ion-button @click="triggerGeolocation">Activer la localisation en background</ion-button>
</template>
