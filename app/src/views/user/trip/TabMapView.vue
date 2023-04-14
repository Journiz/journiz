<script lang="ts" setup="">
import { IonToolbar } from '@ionic/vue'
import { computed, ref } from 'vue'
import Map from '~/components/map/Map.vue'
import MapMarker from '~/components/map/MapMarker.vue'
import { useUserStore } from '~/stores/user'
import LerpCoordinates from '~/components/map/LerpCoordinates.vue'

const page = ref()

const store = useUserStore()
const teams = computed(() => store.trip?.expand?.teams ?? [])
</script>
<template>
  <IonPage ref="page">
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Map</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div class="w-full h-full">
        <Map :map-center="{ lng: 6.1, lat: 45.91 }" :zoom="14">
          <LerpCoordinates
            v-for="team in teams"
            :key="team.id"
            v-slot="{ coordinates }"
            :coordinates="{ lng: team.longitude, lat: team.latitude }"
          >
            <MapMarker :position="coordinates" icon="basic"> Hello </MapMarker>
          </LerpCoordinates>
        </Map>
      </div>
    </IonContent>
  </IonPage>
</template>
