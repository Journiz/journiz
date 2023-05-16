<script lang="ts" setup="">
import { computed } from 'vue'
import { useTeamStore } from '~/stores/team/team'
import Button from '~/components/design-system/Button.vue'
import { useThemeColor } from '~/globals/colors'

const store = useTeamStore()

const takenColors = computed(
  () =>
    store.trip?.expand?.teams
      ?.filter((team) => team.id !== store.team?.id && team.color)
      .map((team) => team.color) ?? []
)
const { setThemeColor } = useThemeColor()
</script>
<template>
  <div class="px-2/20 pt-32 pb-8 flex flex-col">
    <h1 class="text-center text-2xl font-black">
      Voyageurs, quelle est votre couleur ?
    </h1>
    <div>Color: {{ store.team.color }}</div>
    <pre>{{ takenColors }}</pre>
    <div class="mt-auto">
      <Button class="w-full" @click="setThemeColor('green')">Suivant</Button>
    </div>
  </div>
</template>
