<script lang="ts" setup="">
import { computed } from 'vue'
import { useTeamStore } from '~/stores/team/team'

const store = useTeamStore()
const takenColors = computed(
  () =>
    store.trip?.expand?.teams
      ?.filter((team) => team.id !== store.team?.id && team.color)
      .map((team) => team.color) ?? []
)
</script>
<template>
  <div class="bg-blue">
    <div>Color: {{ store.team.color }}</div>
    <pre>{{ takenColors }}</pre>
  </div>
</template>
