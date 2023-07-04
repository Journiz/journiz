<script lang="ts" setup="">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import TopTabs from '~/components/tabs/top-tabs/TopTabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TeamsMap from '~/components/user/tabs/teams/TeamsMap.vue'
import TeamsList from '~/components/user/tabs/teams/TeamsList.vue'
import Header from '~/components/design-system/Header.vue'
import { useUserStore } from '~/stores/user'

const store = useUserStore()
const emit = defineEmits(['tabChange'])

const initialTab = (useRoute().query.tab as string) ?? 'map'
onMounted(() => {
  emit('tabChange', initialTab)
})
const tabs = ref<typeof TopTabs>()
watch(
  () => tabs.value?.state.activeTabName,
  (tab) => {
    emit('tabChange', tab)
  }
)
</script>
<template>
  <div v-if="store.trip" class="w-full h-full flex-grow flex flex-col">
    <Header
      :title="store.trip.name"
      subtitle="Carte"
      :not-display-infos="true"
    />
    <TopTabs ref="tabs">
      <Tab
        title="Equipes"
        name="list"
        :default-selected="initialTab === 'list'"
      >
        <TeamsList />
      </Tab>
      <Tab title="Carte" name="map" :default-selected="initialTab !== 'list'">
        <TeamsMap />
      </Tab>
    </TopTabs>
  </div>
</template>
