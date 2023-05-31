<script setup lang="ts">
import { computed, PropType } from 'vue'
// @ts-ignore
import { MapboxMarker } from '@studiometa/vue-mapbox-gl'
import markers from '~/assets/markers'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Coordinates } from '~/types/Coordinates'

const props = defineProps({
  icon: {
    type: String,
    validator(value: string) {
      if (Object.keys(markers).includes(value)) {
        return true
      }
      console.warn(
        '⚠️ The icon name' +
          value +
          "of the props doesn't exist in icons.ts, import or correct string"
      )
      return false
    },
  },
  position: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
})

const iconComp = computed(() => markers[props.icon as keyof typeof markers])
</script>
<template>
  <MapboxMarker :lng-lat="position">
    <p>
      <component :is="iconComp as any" v-if="iconComp" class="h-5 w-5" />
      <slot v-else-if="$slots.icon" name="icon" />
    </p>
    <template v-if="$slots.default" #popup>
      <p><slot /></p>
    </template>
  </MapboxMarker>
</template>
