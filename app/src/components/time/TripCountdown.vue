<script lang="ts" setup>
import { Trip as TripType } from '@journiz/api-types'
import { computed } from 'vue'
import { useNow } from '@vueuse/core'
import { padWithZero } from '~/utils/dates'

const props = defineProps<{
  trip: TripType
}>()
const endDate = computed(() => {
  if (!props.trip?.expand?.journey) return null
  const start = new Date(Date.parse(props.trip.date))
  return new Date(
    start.getTime() + props.trip.expand.journey.duration * 60 * 1000
  )
})
const now = useNow()
const remaining = computed(() => {
  if (!endDate.value) return null
  return Math.max(0, endDate.value.getTime() - now.value.getTime())
})
const remainingHours = computed(() => {
  if (remaining.value === null) return null
  return padWithZero(Math.floor(remaining.value / 1000 / 60 / 60))
})
const remainingMinutes = computed(() => {
  if (remaining.value === null) return null
  return padWithZero(Math.floor((remaining.value / 1000 / 60) % 60))
})
const remainingSeconds = computed(() => {
  if (remaining.value === null) return null
  return padWithZero(Math.floor((remaining.value / 1000) % 60))
})
</script>
<template>
  <button
    class="bg-theme text-white flex items-center text-lg px-5 py-2 rounded-lg"
  >
    <span class="i-uil:stopwatch text-xl mr-1"></span>
    <span v-if="remainingHours">{{ remainingHours }}h</span>
    <span v-if="remainingMinutes">{{ remainingMinutes }}:</span>
    <span v-if="remainingSeconds">{{ remainingSeconds }}</span>
  </button>
</template>
