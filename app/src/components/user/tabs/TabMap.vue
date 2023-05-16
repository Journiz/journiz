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
const colors = [
  'bg-#E8B8FF',
  'bg-#FF6147',
  'bg-blue',
  'bg-yellow',
  'bg-pink',
  'bg-orange',
]

// TODO: Check if point marker is complete by the current team and switch to team color
</script>
<template>
  <div class="w-full h-full flex-grow">
    <Map :map-center="{ lng: 6.1015, lat: 45.9075 }" :zoom="16">
      <MapMarker
        v-for="point in store.journey.expand.points"
        :key="point.id"
        :position="{ lng: point.longitude, lat: point.latitude }"
      >
        <template #icon>
          <div
            class="relative w-18 h-18 rounded-full shadow-lg overflow-hidden flex items-center justify-center"
          >
            <div
              class="w-full h-full absolute top-0 left-0 bg-green-dark/25"
            ></div>
            <div
              class="h-8 w-8 rounded-full bg-green-dark/80 text-6 color-white flex items-center justify-center"
            >
              <div class="i-uil:question"></div>
            </div>
          </div>
        </template>
      </MapMarker>
      <LerpCoordinates
        v-for="(team, i) in teams"
        :key="team.id"
        v-slot="{ coordinates }"
        :coordinates="{ lng: team.longitude, lat: team.latitude }"
      >
        <MapMarker :position="coordinates">
          <template #icon
            ><div
              class="w-6 h-6 rounded-full shadow-lg"
              border="7 white"
              :class="colors[i]"
            ></div
          ></template>
        </MapMarker>
      </LerpCoordinates>
    </Map>
  </div>
</template>
