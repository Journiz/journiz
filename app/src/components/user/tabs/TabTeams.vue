<script lang="ts" setup="">
import TopTabs from '~/components/tabs/top-tabs/TopTabs.vue'
import Tab from '~/components/tabs/Tab.vue'
</script>
<template>
  <div class="w-full h-full flex-grow">
    <TopTabs>
      <Tab title="Equipes" name="list">Equipes</Tab>
      <Tab title="Carte" name="map">Carte</Tab>
    </TopTabs>
  </div>
</template>
