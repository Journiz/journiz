<script lang="ts" setup="">
import { watch } from 'vue'
import Page from '~/components/Page.vue'
import Tabs from '~/components/tabs/tab-bar/Tabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TabHome from '~/components/user/tabs/TabHome.vue'
import TabTeams from '~/components/user/tabs/TabTeams.vue'
import TabChat from '~/components/user/tabs/TabChat.vue'
import TabValidation from '~/components/user/tabs/TabValidation.vue'
import { useUserStore } from '~/stores/user'
import { showModal } from '~/composables/useModal'
const store = useUserStore()
watch(
  () => store.trip?.status,
  async (status) => {
    if (status === 'finishing') {
      await showModal(
        "C'est fini !",
        `<p>Le chrono est fini !</p>
<p>Les équipes ont reçu une notification et se rendent au point de ralliement</p>`,
        [
          {
            title: 'Ok',
            actionName: 'ok',
            color: 'theme',
          },
        ],
        'alarm'
      )
    }
  }
)
</script>
<template>
  <keep-alive>
    <Page id="trip-tabs-page">
      <Tabs class="flex-grow">
        <Tab title="Paramètres" name="settings" icon="i-uil:cog">
          <TabHome />
        </Tab>
        <Tab title="Carte" name="map" icon="i-uil:map" default-selected>
          <TabTeams />
        </Tab>
        <Tab title="Validation" name="validation" icon="i-uil:image-question">
          <TabValidation />
        </Tab>
        <Tab title="Messages" name="chat" icon="i-ph:chats-circle-bold">
          <TabChat />
        </Tab>
      </Tabs>
    </Page>
  </keep-alive>
</template>
