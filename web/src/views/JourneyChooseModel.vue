<script setup>
import Map from '~/components/Map.vue'
import MapMarker from '~/components/MapMarker.vue'
</script>
<template>
  <Map :map-center="[6.129384, 45.899247]" zoom="15">
    <MapMarker :position="[6.129384, 45.899247]" icon="basecamp">
      <b>L'Hotel de ville</b>
    </MapMarker>
    <MapMarker :position="[6.131684, 45.901247]" icon="basic">
      Le paquier
    </MapMarker>
    <MapMarker :position="[6.121234, 45.899247]" icon="basic" />
    <MapMarker :position="[6.121234, 45.897247]" icon="basic" />
    <MapMarker :position="[6.122234, 45.901247]" icon="basic" />
    <MapMarker :position="[6.124234, 45.899247]" icon="secondary" />
  </Map>
</template>
