<script lang="ts" setup="">
import { useTeamStore } from '~/stores/team/team'

const store = useTeamStore()
</script>
<template>
  <div class="bg-blue">
    <div>Color: {{ store.team.color }}</div>
    <pre>{{ store.trip.expand.teams }}</pre>
  </div>
</template>
