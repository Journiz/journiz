<script lang="ts" setup="">
import TopTabs from '~/components/tabs/top-tabs/TopTabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TeamsMap from '~/components/user/tabs/teams/TeamsMap.vue'
import TeamsList from '~/components/user/tabs/teams/TeamsList.vue'
import Header from '~/components/design-system/Header.vue'
import { useUserStore } from '~/stores/user'

const store = useUserStore()
</script>
<template>
  <div v-if="store.trip" class="w-full h-full flex-grow flex flex-col">
    <Header :title="store.trip.name" subtitle="Carte" />
    <TopTabs>
      <Tab title="Equipes" name="list">
        <TeamsList />
      </Tab>
      <Tab title="Carte" name="map" default-selected>
        <TeamsMap />
      </Tab>
    </TopTabs>
  </div>
</template>
