<script lang="ts" setup>
import {useRealtimeTrip, useTeam} from '#imports';

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++

// const { data: journey } = useRealtimeJourney('5mk4b6z2819n3x8')

const {data: team, update: updateTeam} = useTeam('imgsb5xbpeh7vbx')
const update = () => {
  team.value!.name = 'michel'
  updateTeam(  )
}

</script>
<template>
  <div class="flex flex-col items-center">
    <h1>Journiz</h1>
    <div v-if="team">
      <pre>{{ team }}</pre>
    </div>
    <ion-button @click="update">Update name</ion-button>
    <p>Count is: <strong>{{ count }}</strong>, doubleCount is <strong class="text-red-600">{{ doubleCount }}</strong>
    </p>
    <ion-button @click="increment">Increment</ion-button>
  </div>
</template>
