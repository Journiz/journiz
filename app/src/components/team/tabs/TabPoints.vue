<script lang="ts" setup="">
import TopTabs from '~/components/tabs/top-tabs/TopTabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import { useTeamStore } from '~/stores/team/team'
import Header from '~/components/design-system/Header.vue'
import PointsList from '~/components/team/points/PointsList.vue'
const store = useTeamStore()
</script>
<template>
  <div
    v-if="store.trip && store.team"
    class="w-full h-full flex flex-col relative"
  >
    <Header :title="store.trip?.name" :subtitle="store.team?.name" />
    <TopTabs class="flex-shrink">
      <Tab title="Enigmes" name="list" default-selected>
        <PointsList />
      </Tab>
      <Tab title="Carte" name="map"> Carte </Tab>
    </TopTabs>
  </div>
</template>