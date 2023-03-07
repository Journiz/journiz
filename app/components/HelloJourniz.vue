<script lang="ts" setup>
const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++

const journey = useRealtimeJourney('r6t26b2ariy34km')

</script>
<template>
  <div class="flex flex-col items-center">
    <h1>Journiz</h1>
    <p>
    </p>
    <p>Count is: <strong>{{ count }}</strong>, doubleCount is <strong class="text-red-600">{{ doubleCount }}</strong>
    </p>
    <ion-button @click="increment">Increment</ion-button>
  </div>
</template>
