<script setup lang="ts">
import EditPointLocation from '~/components/point/EditPointLocation.vue'
import { usePointStore } from '~/stores/point'
const store = usePointStore()
</script>
<template>
  <section class="h-full">
    <div v-if="store.point" class="flex flex-col h-full">
      <EditPointLocation :point="store.point" />
    </div>
  </section>
</template>
