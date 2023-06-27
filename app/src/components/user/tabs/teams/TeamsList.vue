<script lang="ts" setup="">
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'
import TeamListItem from '~/components/user/TeamListItem.vue'

const store = useUserStore()
const teams = computed(() => store.trip?.expand?.teams ?? [])
// https://www.notion.so/journiz/Affichage-quipe-en-liste-quipe-single-69aebac3a6a54789a79fbf348b5c8e2d?pvs=4
/* Ici les équipes, by Vincent® (attention au padding de la bottom bar, le
composant passe derrière) */
</script>
<template>
  <div
    v-if="teams"
    class="flex flex-col bg-beige-light pt-3 px-5 pb-56 overflow-y-scroll h-full w-full"
  >
    <TeamListItem
      v-for="team in teams"
      :key="team.id"
      class="mb-4"
      :team="team"
    />
  </div>
</template>
