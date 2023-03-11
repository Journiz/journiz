<script lang="ts" setup>
import {useRealtimeTrip, useTeam} from '#imports';

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++

</script>
<template>
  <div class="flex flex-col items-center">
    <h1>Journiz</h1>
    <p>Count is: <strong>{{ count }}</strong>, doubleCount is <strong class="text-red-600">{{ doubleCount }}</strong>
    </p>
    <ion-button @click="increment">Increment</ion-button>
  </div>
</template>
