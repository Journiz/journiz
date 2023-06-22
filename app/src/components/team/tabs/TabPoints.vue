<script lang="ts" setup="">
import TopTabs from '~/components/tabs/top-tabs/TopTabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import { useTeamStore } from '~/stores/team/team'
import Header from '~/components/design-system/Header.vue'
import PointsList from '~/components/team/points/PointsList.vue'
import TripCountdown from '~/components/time/TripCountdown.vue'

const store = useTeamStore()
</script>
<template>
  <div
    v-if="store.trip && store.team"
    class="w-full h-full flex flex-col relative"
  >
    <Header :title="store.trip?.name" :subtitle="store.team?.name" />
    <TopTabs v-if="store.trip?.status === 'playing'" class="flex-shrink">
      <Tab title="Enigmes" name="list">
        <PointsList />
      </Tab>
      <Tab title="Carte" name="map" default-selected>
        <div
          class="absolute bottom-28 left-0 right-0 px-4 flex items-center justify-center gap-2"
        >
          <TripCountdown v-if="store.trip" :trip="store.trip" />
          <button
            class="bg-green text-white flex items-center text-lg px-5 py-2 rounded-lg flex-shrink-0 gap-2"
          >
            <span class="i-mdi:star-four-points-circle-outline"></span>
            <span>{{ store.team?.score }} points</span>
          </button>
        </div>
      </Tab>
    </TopTabs>
    <div v-else class="flex-grow">Carte sans les points</div>
  </div>
</template>
