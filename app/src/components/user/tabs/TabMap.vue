<script lang="ts" setup="">
import { IonToolbar } from '@ionic/vue'
import { computed, ref } from 'vue'
import Map from '~/components/map/Map.vue'
import MapMarker from '~/components/map/MapMarker.vue'
import { useUserStore } from '~/stores/user'
import LerpCoordinates from '~/components/map/LerpCoordinates.vue'
import SafeZone from '~/components/map/SafeZone.vue'

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
</script>
<template>
  <div class="w-full h-full flex-grow">
    <Map :map-center="{ lng: 6.1015, lat: 45.9075 }" :zoom="16">
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

      <SafeZone
        v-if="store.journey.safeZone"
        :coords="store.journey.safeZone"
      />
    </Map>
  </div>
</template>
