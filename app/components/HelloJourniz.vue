<script lang="ts" setup>
const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++

// const { data: journey } = useRealtimeJourney('5mk4b6z2819n3x8')

const {data: trip} = useRealtimeTrip('cc790mc7p9ywe2a')
</script>
<template>
  <div class="flex flex-col items-center">
    <h1>Journiz</h1>
    <p v-if="trip">
      <pre>{{ trip }}</pre>
    </p>
    <p>Count is: <strong>{{ count }}</strong>, doubleCount is <strong class="text-red-600">{{ doubleCount }}</strong>
    </p>
    <ion-button @click="increment">Increment</ion-button>
  </div>
</template>
