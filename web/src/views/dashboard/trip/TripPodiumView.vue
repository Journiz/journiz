<script lang="ts" setup="">
import { useTripForGameMaster } from '@journiz/composables'
import { useRoute } from 'vue-router'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import PodiumItem from '~/components/trip/PodiumItem.vue'
import RankingItem from '~/components/trip/RankingItem.vue'

const id = useRoute().params.tripId
const { data: trip, loading, update } = useTripForGameMaster(id as string)
</script>
<template>
  <div v-if="!loading && trip" class="h-full px-20 pt-16 overflow-y-auto">
    <CustomHeader :title="trip.name"
      ><DefaultButton>Partager</DefaultButton>
    </CustomHeader>
    <div class="pt-6">
      <div class="font-bold text-2xl">Classement</div>
      <div class="flex gap-2">
        <PodiumItem
          v-for="(team, i) in trip.expand?.teams.slice(0, 3)"
          :key="team.id"
          class="w-1/3"
          :team="team"
          :rank="i"
        />
      </div>
      <div
        v-if="trip.expand?.teams.length > 3"
        class="flex flex-col gap-8 mt-8"
      >
        <RankingItem
          v-for="(team, i) in trip.expand?.teams.slice(
            (trip.expand?.teams.length - 3) * -1
          )"
          :key="team.id"
          :rank="i"
          :team="team"
        />
      </div>
    </div>
  </div>
  <div v-else class="p-5">Chargement du voyage...</div>
</template>
