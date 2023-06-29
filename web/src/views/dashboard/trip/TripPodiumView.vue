<script lang="ts" setup="">
import { useTripForGameMaster } from '@journiz/composables'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { Team } from '../../../../../packages/api-types'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import PodiumItem from '~/components/trip/PodiumItem.vue'
import RankingItem from '~/components/trip/RankingItem.vue'

const id = useRoute().params.tripId
const { data: trip, loading } = useTripForGameMaster(id as string)
const teams = computed(() => {
  const array = trip.value?.expand?.teams
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
  <div
    v-if="!loading && trip"
    class="flex flex-col h-screen px-20 pt-16 overflow-hidden"
  >
    <CustomHeader :title="trip.name"
      ><DefaultButton>Partager</DefaultButton>
    </CustomHeader>
    <div class="pt-6 grow flex flex-col overflow-hidden">
      <div class="sticky top-0 w-full bg-beige-light font-bold text-2xl mb-2">
        Classement
      </div>
      <div class="grow overflow-scroll pt-6 pb-12">
        <div class="flex gap-2">
          <PodiumItem
            v-for="(team, i) in teams.slice(0, 3)"
            :key="team.id"
            class="w-1/3"
            :team="team"
            :rank="i"
          />
        </div>
        <div v-if="teams.length > 3" class="flex flex-col gap-8 mt-8">
          <RankingItem
            v-for="(team, i) in teams.slice((teams.length - 3) * -1)"
            :key="team.id"
            :rank="i"
            :team="team"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-5">Chargement du voyage...</div>
</template>
