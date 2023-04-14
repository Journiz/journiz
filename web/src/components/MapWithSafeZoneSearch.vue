<script setup lang="ts">
import { PropType } from 'vue'
import Map from '~/components/Map.vue'
import { Coordinates } from '~/types/Coordinates'
defineProps({
  mapCenter: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
  zoom: {
    type: Number as PropType<number>,
    default: 10,
  },
})
</script>
<template>
  <div><Map :map-center="mapCenter" :zoom="zoom" /></div>
</template>
