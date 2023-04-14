<script lang="ts" setup="">
import { IonToolbar } from '@ionic/vue'
import { computed, reactive, ref } from 'vue'
// @ts-ignore
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import Map from '~/components/map/Map.vue'
import MapMarker from '~/components/map/MapMarker.vue'
import { useUserStore } from '~/stores/user'

const page = ref()

const markers = reactive([
  { lng: 6.12, lat: 45.89 },
  { lng: 6.12, lat: 45.85 },
])

const store = useUserStore()
// setInterval(() => {
//   markers[0].lat += 0.001
// }, 300)
const move = () => {
  markers.push({ lng: 6.13, lat: 45.9 })
}
const teams = computed(() => store.trip?.expand?.teams ?? [])
</script>
<template>
  <IonPage ref="page">
    <IonHeader class="">
      <IonToolbar>
        <IonTitle @click="move">Map</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div class="w-full h-full">
        <Map :map-center="{ lng: 6.1, lat: 45.91 }" :zoom="14">
          <MapMarker
            v-for="team in teams"
            :key="team.id"
            :position="{ lng: team.longitude, lat: team.latitude }"
            icon="basic"
          >
            Hello
          </MapMarker>
        </Map>
      </div>
    </IonContent>
  </IonPage>
</template>
