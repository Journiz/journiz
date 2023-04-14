<script lang="ts" setup="">
import { computed, PropType } from 'vue'
import { useLerp } from '@journiz/composables'
import { Coordinates } from '~/types/Coordinates'

const props = defineProps({
  coordinates: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
})
const lat = computed(() => props.coordinates.lat)
const lng = computed(() => props.coordinates.lng)
const lerpLng = useLerp(lng)
const lerpLat = useLerp(lat)
</script>
<template>
  <slot :coordinates="{ lng: lerpLng, lat: lerpLat }"></slot>
</template>
