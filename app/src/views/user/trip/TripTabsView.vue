<script lang="ts" setup="">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Page from '~/components/Page.vue'
import Tabs from '~/components/tabs/tab-bar/Tabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TabHome from '~/components/user/tabs/TabHome.vue'
import TabTeams from '~/components/user/tabs/TabTeams.vue'
import TabChat from '~/components/user/tabs/TabChat.vue'
import TabValidation from '~/components/user/tabs/TabValidation.vue'
import { useUserStore } from '~/stores/user'
import { showModal } from '~/composables/useModal'
import { warnOutside } from '~/utils/warnOutside'
import TripCountdown from '~/components/time/TripCountdown.vue'
import { warnUserEndTrip } from '~/utils/warnStartStop'

const store = useUserStore()
watch(
  () => store.trip?.status,
  async (status) => {
    if (status === 'finishing') {
      await warnUserEndTrip()
    }
  }
)
watch(
  () => store.trip?.expand?.teams,
  async (teams, oldTeams) => {
    for (const idx in teams) {
      const i = idx as unknown as number
      if (teams[i].isOutside && !oldTeams?.[i]?.isOutside) {
        await warnOutside(teams[i].id, teams[i].name)
      }
    }
  }
)

const initialTab = (useRoute().query.tab as string) ?? 'map'
const tabs = ref<typeof Tabs>()
const currentTab = computed(() => tabs.value?.state.activeTabName)
</script>
<template>
  <keep-alive>
    <Page id="trip-tabs-page">
      <Tabs ref="tabs" class="flex-grow">
        <Tab
          title="Paramètres"
          name="settings"
          icon="i-journiz:settings"
          icon-active="i-journiz:settings-fill"
          :default-selected="initialTab === 'settings'"
        >
          <TabHome />
        </Tab>
        <Tab
          title="Parcours"
          name="map"
          icon="i-journiz:map"
          icon-active="i-journiz:map-fill"
          :default-selected="['map', 'list'].includes(initialTab)"
        >
          <TabTeams />
        </Tab>
        <Tab
          title="Validation"
          name="validation"
          icon="i-journiz:validation"
          icon-active="i-journiz:validation-fill"
          :default-selected="initialTab === 'validation'"
        >
          <TabValidation />
        </Tab>
        <Tab
          title="Messages"
          name="chat"
          icon="i-journiz:messages"
          icon-active="i-journiz:messages-fill"
          :default-selected="initialTab === 'chat'"
        >
          <TabChat />
        </Tab>
      </Tabs>

      <div
        v-show="!['chat'].includes(currentTab)"
        class="absolute bottom-36 left-1/2 transform -translate-x-1/2"
      >
        <TripCountdown
          v-if="store.trip"
          class="btn-animation"
          :trip="store.trip"
          @click="tabs?.setActiveTab('settings')"
        />
      </div>
    </Page>
  </keep-alive>
</template>
