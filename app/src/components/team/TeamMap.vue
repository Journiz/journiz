<script setup lang="ts">
import { Point } from '@journiz/api-types'
import { computed } from 'vue'
import { useTeamStore } from '~/stores/team/team'
import Map from '~/components/map/Map.vue'
import MapMarker from '~/components/map/MapMarker.vue'
import { getColor } from '~/composables/useThemeColor'
import LerpCoordinates from '~/components/map/LerpCoordinates.vue'
import { showModal } from '~/composables/useModal'
import { teamDistanceFromPoint } from '~/utils/teamDistanceFromPoint'
import TeamPointMarker from '~/components/team/points/TeamPointMarker.vue'

const store = useTeamStore()
const props = defineProps<{
  points?: Point[]
}>()

const initialMapCenter = {
  lng: store.journey?.basecampLongitude ?? 0,
  lat: store.journey?.basecampLatitude ?? 0,
}
const visiblePoints = computed(() => {
  if (!props.points) {
    return []
  }
  return props.points.filter(
    (point) => point.hasLocation && point.answerType !== 'location'
  )
})
</script>
<template>
  <Map :map-center="initialMapCenter" :zoom="13">
    <MapMarker
      v-for="point in visiblePoints"
      :key="point.id"
      :position="{ lng: point.longitude, lat: point.latitude }"
    >
      <template #icon>
        <TeamPointMarker :point="point" />
      </template>
    </MapMarker>
    <MapMarker :position="initialMapCenter">
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
        </div>
      </template>
    </MapMarker>
    <LerpCoordinates
      v-if="store.team"
      v-slot="{ coordinates }"
      :coordinates="{ lng: store.team.longitude, lat: store.team.latitude }"
    >
      <MapMarker :position="coordinates">
        <template #icon
          ><div
            class="w-6 h-6 rounded-full shadow-lg"
            border="7 white"
            :style="{ backgroundColor: getColor(store.team.color as any) }"
          ></div
        ></template>
      </MapMarker>
    </LerpCoordinates>
  </Map>
</template>
