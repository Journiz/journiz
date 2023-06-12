<script lang="ts" setup="">
import { watch } from 'vue'
import { useIonRouter } from '@ionic/vue'
import Page from '~/components/Page.vue'
import Tabs from '~/components/tabs/tab-bar/Tabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TabSettings from '~/components/team/tabs/TabSettings.vue'
import ButtonOnlyTab from '~/components/tabs/tab-bar/ButtonOnlyTab.vue'
import TabPoints from '~/components/team/tabs/TabPoints.vue'
import { useTeamStore } from '~/stores/team/team'
import { showModal } from '~/composables/useModal'

const store = useTeamStore()
const router = useIonRouter()
watch(
  () => store.trip?.status,
  async (status) => {
    if (status === 'finishing') {
      await showModal(
        'Driiiiiiiing !',
        `<p>Et c’est fini ! Bravo à tous !</p>
<p>Retournez au point de raliement pour finir cette super partie ! Soyez fiers !</p>`,
        [
          {
            title: 'Rentrer au point de ralliement',
            actionName: 'ok',
            color: 'theme',
          },
        ],
        'alarm'
      )
      router.replace({ name: 'team' })
    }
  }
)
</script>
<template>
  <keep-alive>
    <Page id="trip-tabs-page">
      <Tabs class="flex-grow">
        <Tab title="Paramètres" name="settings" icon="i-uil:cog">
          <TabSettings />
        </Tab>
        <Tab title="Carte" name="map" icon="i-uil:map" default-selected>
          <TabPoints />
        </Tab>
        <Tab title="Score" name="score" icon="i-uil:image-question">
          Score
        </Tab>
        <ButtonOnlyTab
          title="Messages"
          name="chat"
          icon="i-ph:chats-circle-bold"
          :to="{ name: 'team-chat' }"
        >
        </ButtonOnlyTab>
      </Tabs>
    </Page>
  </keep-alive>
</template>
