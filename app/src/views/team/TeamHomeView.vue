<script lang="ts" setup="">
import { onMounted, onUnmounted, watch } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { useStorage, watchOnce } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useRouteQuery } from '@vueuse/router'
import Page from '~/components/Page.vue'
import Tabs from '~/components/tabs/tab-bar/Tabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TabSettings from '~/components/team/tabs/TabSettings.vue'
import ButtonOnlyTab from '~/components/tabs/tab-bar/ButtonOnlyTab.vue'
import TabPoints from '~/components/team/tabs/TabPoints.vue'
import { useTeamStore } from '~/stores/team/team'
import { showModal } from '~/composables/useModal'
import { warnTeamOutside } from '~/utils/warnOutside'
import { useGeolocationStore } from '~/stores/geolocation'
import { warnTeamEndTrip } from '~/utils/warnStartStop'
import TabTeamScore from '~/components/team/tabs/TabTeamScore.vue'
import warnSecurity from '~/utils/warnSecurity'

const store = useTeamStore()
const router = useIonRouter()
watch(
  () => store.trip?.status,
  async (status) => {
    if (status === 'finishing') {
      await warnTeamEndTrip()
      router.replace({ name: 'team' })
    }

    if (status === 'finished') {
      router.replace({ name: 'team-podium' })
    }
  }
)

watch(
  () => store.team?.isOutside,
  async (isOutside) => {
    if (isOutside) {
      await warnTeamOutside()
    }
  }
)

const geolocationStore = useGeolocationStore()
const preventGeolocation = useStorage('preventGeolocation', false)
watch(preventGeolocation, (prevent) => {
  if (prevent) {
    geolocationStore.stopWatching()
    geolocationStore.stopReporting()
  } else {
    geolocationStore.startWatching()
    geolocationStore.startReporting()
  }
})
onMounted(() => {
  store.startReportingBattery()
  if (!preventGeolocation.value) {
    geolocationStore.startWatching()
    geolocationStore.startReporting()
  }
})
onUnmounted(() => {
  store.stopReportingBattery()
  // geolocationStore.stopWatching()
  // geolocationStore.stopReporting()
})

const query = useRouteQuery('justStarted', '')
if (query.value) {
  query.value = ''
  // When the game just started, show security warning when the team starts moving
  watchOnce(
    () => [store.team?.latitude, store.team?.longitude],
    () => {
      warnSecurity()
    }
  )
}
</script>
<template>
  <keep-alive>
    <Page id="trip-tabs-page">
      <Tabs class="flex-grow">
        <Tab
          title="Paramètres"
          name="settings"
          icon="i-journiz:settings"
          icon-active="i-journiz:settings-fill"
        >
          <TabSettings />
        </Tab>
        <Tab
          title="Parcours"
          name="map"
          icon="i-journiz:map"
          icon-active="i-journiz:map-fill"
          default-selected
        >
          <TabPoints />
        </Tab>
        <Tab
          title="Score"
          name="score"
          icon="i-journiz:podium"
          icon-active="i-journiz:podium-fill"
        >
          <!-- Score -->
          <TabTeamScore />
        </Tab>
        <ButtonOnlyTab
          title="Messages"
          name="chat"
          icon="i-journiz:messages"
          icon-active="i-journiz:messages-fill"
          :to="{ name: 'team-chat' }"
        >
        </ButtonOnlyTab>
      </Tabs>
    </Page>
  </keep-alive>
</template>
