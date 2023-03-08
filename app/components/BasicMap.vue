<script lang="ts" setup>
import { MapboxMap } from '@studiometa/vue-mapbox-gl';
</script>
<template>
  <MapboxMap
      class="w-full h-full absolute top-0 left-0"
      access-token="pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg"
      map-style="mapbox://styles/mapbox/streets-v12"
      :center="[6.129384, 45.899247]"
      :zoom="13"
  />

</template>
<style scoped>
</style>
