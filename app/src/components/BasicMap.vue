<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css'
// @ts-ignore
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import {
  IonIcon,
  IonButton,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/vue'
import {
  navigateCircleOutline,
  chevronDownCircle,
  magnetOutline,
} from 'ionicons/icons'
import { reactive, ref, watch } from 'vue'
import { useGeolocationStore } from '~/stores/geolocation'

const location = useGeolocationStore()

const map = ref<MapboxMap>()
const track = reactive({ isTracking: false })

const recenterMapOnPosition = () => {
  map.value.setCenter([
    location.currentLocation.lng,
    location.currentLocation.lat,
  ])
}

watch(location.currentLocation, () => {
  // Map track current position if is enable
  if (track.isTracking) {
    recenterMapOnPosition()
  }
})

/**
 * Function to test the updating of data in server without running geolocation
 */
const fakeChange = () => {
  location.currentLocation.lat += 0.1
}

const toggleTracker = () => {
  track.isTracking = !track.isTracking
  if (track.isTracking) {
    recenterMapOnPosition()
  }
}
</script>
<template>
  <MapboxMap
    class="w-full h-full"
    access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
    map-style="mapbox://styles/mapbox/streets-v12"
    :center="[-122.02703037000001, 37.330208800000001]"
    :zoom="14"
    @mb-created="(mapInstance: MapboxMap) => (map = mapInstance)"
  >
    <MapboxMarker
      :lng-lat="[location.currentLocation.lng, location.currentLocation.lat]"
    >
      <p class="currentPosition-marker">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="15" fill="#4770FF" />
          <circle cx="20" cy="20" r="19.5" stroke="#87B7FF" />
        </svg>
      </p>
    </MapboxMarker>
  </MapboxMap>
  <IonButton @click="fakeChange">Modifier la localisation</IonButton>
  <IonFab slot="fixed" vertical="top" horizontal="start">
    <IonFabButton>
      <IonIcon :icon="chevronDownCircle"></IonIcon>
    </IonFabButton>
    <IonFabList side="bottom">
      <IonFabButton @click="recenterMapOnPosition">
        <IonIcon :icon="navigateCircleOutline"></IonIcon>
      </IonFabButton>
      <IonFabButton
        :color="track.isTracking ? 'primary' : undefined"
        @click="toggleTracker"
      >
        <IonIcon :icon="magnetOutline"></IonIcon>
      </IonFabButton>
    </IonFabList>
  </IonFab>
</template>
<style scoped>
.currentPosition-marker svg {
  width: 20px;
  height: 20px;
}
</style>
