<script lang="ts" setup="">
import { computed } from 'vue'
import Map from '~/components/map/Map.vue'
import MapMarker from '~/components/map/MapMarker.vue'
import { useUserStore } from '~/stores/user'
import LerpCoordinates from '~/components/map/LerpCoordinates.vue'
import SafeZone from '~/components/map/SafeZone.vue'
import { getColor } from '~/composables/useThemeColor'

const store = useUserStore()
const teams = computed(() => store.trip?.expand?.teams ?? [])
// TODO: Check if point marker is complete by the current team and switch to team color (pas ici)
</script>
<template>
  <Map
    v-if="store.journey"
    :map-center="{ lng: 6.1015, lat: 45.9075 }"
    :zoom="16"
  >
    <MapMarker
      :position="{
        lng: store.journey.basecampLongitude,
        lat: store.journey.basecampLatitude,
      }"
    >
      <template #icon>
        <div
          class="relative w-18 h-18 rounded-full shadow-lg overflow-hidden flex items-center justify-center"
        >
          <div class="w-full h-full absolute top-0 left-0 bg-white/40"></div>
          <div
            class="h-8 w-8 rounded-full bg-white text-4 color-green-dark/75 flex items-center justify-center"
          >
            <div class="i-uil:home"></div>
          </div>
        </div> </template
    ></MapMarker>
    <MapMarker
      v-for="point in store.journey.expand?.points ?? []"
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
      v-for="team in teams"
      :key="team.id"
      v-slot="{ coordinates }"
      :coordinates="{ lng: team.longitude, lat: team.latitude }"
    >
      <MapMarker :position="coordinates">
        <template #icon
          ><div
            class="w-6 h-6 rounded-full shadow-lg"
            border="7 white"
            :style="{ backgroundColor: getColor(team.color as any) }"
          ></div
        ></template>
      </MapMarker>
    </LerpCoordinates>

    <SafeZone v-if="store.journey?.safeZone" :coords="store.journey.safeZone" />
  </Map>
</template>
