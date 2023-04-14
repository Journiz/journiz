<script setup lang="ts">
import { ref } from 'vue'
import MapWithSearch from '~/components/MapWithSearch.vue'
const searchPoint = ref([])
</script>
<template>
  <MapWithSearch
    :map-center="[6.129384, 45.899247]"
    :zoom="15"
    class="h-full"
    :initial-coords="[]"
    @update="searchPoint = $event"
  >
  </MapWithSearch>
</template>
