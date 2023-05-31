<script setup lang="ts">
import EditPointLocation from '~/components/point/EditPointLocation.vue'
import { usePointStore } from '~/stores/point'
const store = usePointStore()
</script>
<template>
  <section class="h-full pt-8 pb-6">
    <div
      v-if="store.point"
      class="flex flex-col h-full rounded-lg overflow-hidden"
    >
      <EditPointLocation :point="store.point" />
    </div>
  </section>
</template>
