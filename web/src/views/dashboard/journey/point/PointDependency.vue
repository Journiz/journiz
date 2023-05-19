<script setup lang="ts">
import { ref } from 'vue'
import EditPointTrigger from '~/components/point/EditPointTrigger.vue'
import { usePointStore } from '~/stores/point'
const store = usePointStore()

const pointTrigger = ref('')
const trigger = ref('false')
const handlePointTrigger = (value: string) => {
  console.log(value)
  pointTrigger.value = value
}
</script>
<template>
  <section class="h-full">
    <EditPointTrigger
      :point="store.point"
      @pointTrigger="handlePointTrigger"
      @update:isTrigger="trigger = $event"
    />
  </section>
</template>
