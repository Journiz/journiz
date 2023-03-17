<script lang="ts" setup>
import { IonButton } from '@ionic/vue'
import { computed, ref } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++

console.log('👋 Welcome to app')
</script>
<template>
  <div class="flex flex-col items-center">
    <h1>Journiz</h1>
    <p>
      Count is: <strong>{{ count }}</strong
      >, doubleCount is <strong class="text-red-600">{{ doubleCount }}</strong>
    </p>
    <IonButton @click="increment">Increment</IonButton>
    <ion-button router-link="/geolocation">Go to geolocation</ion-button>
  </div>
</template>
