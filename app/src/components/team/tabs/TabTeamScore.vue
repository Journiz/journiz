<script setup lang="ts">
import { computed } from 'vue'
import Header from '~/components/design-system/Header.vue'
import { useTeamStore } from '~/stores/team/team'
import TeamStats from '~/components/team/TeamStats.vue'
import TeamMembersList from '~/components/team/TeamMembersList.vue'

const store = useTeamStore()
const pointsNumber = computed(() => store.journey?.expand?.points?.length ?? 0)
</script>
<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <Header
      :title="store.team?.name ?? ''"
      subtitle="Informations de l’équipe"
    />
    <div
      v-if="store.team"
      class="grow bg-beige-light px-6 flex flex-col overflow-hidden"
    >
      <TeamStats
        class="pt-4"
        :team="store.team"
        :points-number="pointsNumber"
      />
      <h3 class="block flex items-center">
        <span class="i-fluent:people-team-24-regular text-xl h-6 w-6 mr-2" />
        <span class="text-lg">Membres de l’équipe</span>
      </h3>
      <TeamMembersList
        v-if="store.team.members"
        class="grow"
        :members="store.team.members"
      />
    </div>
  </div>
</template>
