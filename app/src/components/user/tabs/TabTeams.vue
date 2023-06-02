<script lang="ts" setup="">
import TopTabs from '~/components/tabs/top-tabs/TopTabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TeamsMap from '~/components/user/tabs/teams/TeamsMap.vue'
import TeamsList from '~/components/user/tabs/teams/TeamsList.vue'
</script>
<template>
  <div class="w-full h-full flex-grow">
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
