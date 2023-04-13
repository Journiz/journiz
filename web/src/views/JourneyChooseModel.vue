<script setup>
import Map from '~/components/Map.vue'
import MapMarker from '~/components/MapMarker.vue'
import MapWithSearch from '~/components/MapWithSearch.vue'
</script>
<template>
  <MapWithSearch :map-center="[6.129384, 45.899247]" :zoom="15" class="h-full">
  </MapWithSearch>
</template>
