<script lang="ts" setup="">
import { Team } from '@journiz/api-types'
import { computed } from 'vue'
import Page from '~/components/Page.vue'
import { useTeamStore } from '~/stores/team/team'
import TeamAvatar from '~/components/team/TeamAvatar.vue'
const store = useTeamStore()
const teams = computed(() => {
  const array = store.trip?.expand?.teams
  return array?.sort(compareFn)
})

const compareFn = (a: Team, b: Team) => {
  if (a.score < b.score) {
    return 1
  }
  if (a.score > b.score) {
    return -1
  }
  return 0
}
</script>
<template>
  <Page class="bg-beige-light px-6">
    <div class="text-xl font-black mx-auto mt-10">Classement final</div>
    <div class="relative flex flex-wrap pt-20">
      <img
        class="absolute left-0 top-0 w-auto h-48"
        src="../../assets/img/backgrounds/bg-ranking.png"
        alt="Background"
      />
      <div
        v-for="(team, i) in teams.slice(0, 3)"
        :key="team.id"
        class="flex"
        :class="[
          i === 0 ? 'w-full justify-center z-1' : 'w-1/2 -mt-1/3',
          i === 2 ? 'justify-end' : '',
        ]"
      >
        <div
          :class="i === 0 ? 'w-46/100' : 'w-76/100'"
          class="aspect-square text-center"
        >
          <div class="relative mb-2">
            <div
              v-if="i === 0"
              class="absolute bg-beige-light top-0 left-0 w-full h-full rounded-full scale-105"
            />
            <TeamAvatar class="relative" :team="team" />
            <div
              class="absolute top-0 w-8 h-8 bg-green rounded-full flex items-center justify-center color-white font-extrabold"
              :class="[
                i === 0 ? 'left-1/2 -translate-x-1/2 -translate-y-1/2' : '',
                i === 2 ? 'right-0' : '',
              ]"
            >
              {{ i + 1 }}
            </div>
          </div>
          <div class="px-2">
            <span class="font-medium">{{ team.name }}</span> <br />
            <span class="font-light">{{ team.score }} pts</span>
          </div>
        </div>
      </div>
      <div v-if="teams.length > 3" class="flex flex-col w-full gap-4 mt-8">
        <div
          v-for="(team, i) in teams.slice((teams.length - 3) * -1)"
          :key="team.id"
          class="relative flex items-center ml-3 border-2 border-green-dark bg-white rounded-lg py-3 pl-2 pr-6"
        >
          <div
            class="absolute -top-3 -left-3 w-6 h-6 bg-green rounded-full flex items-center justify-center color-white font-extrabold"
          >
            {{ i + 4 }}
          </div>
          <TeamAvatar class="relative h-8 w-8 mr-2" :team="team" />
          <span class="grow font-medium">{{ team.name }}</span>
          <span class="w-fit font-light">{{ team.score }} points</span>
        </div>
      </div>
    </div>
  </Page>
</template>
