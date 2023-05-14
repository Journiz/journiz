<script setup lang="ts">
import { ref } from 'vue'
import MapWithSearch from '~/components/MapWithSearch.vue'
const searchPoint = ref([])
</script>
<template>
  <MapWithSearch
    :map-center="[6.129384, 45.899247]"
    :zoom="15"
    class="h-screen"
    :initial-coords="[0, 0]"
    @update="searchPoint = $event"
  >
  </MapWithSearch>
</template>
