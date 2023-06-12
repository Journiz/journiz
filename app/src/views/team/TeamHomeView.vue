<script lang="ts" setup="">
import Page from '~/components/Page.vue'
import Tabs from '~/components/tabs/tab-bar/Tabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TabSettings from '~/components/team/tabs/TabSettings.vue'
import ButtonOnlyTab from '~/components/tabs/tab-bar/ButtonOnlyTab.vue'
import TabPoints from '~/components/team/tabs/TabPoints.vue'
</script>
<template>
  <Page id="trip-tabs-page">
    <Tabs class="flex-grow">
      <Tab title="Paramètres" name="settings" icon="i-uil:cog">
        <TabSettings />
      </Tab>
      <Tab title="Carte" name="map" icon="i-uil:map" default-selected>
        <TabPoints />
      </Tab>
      <Tab title="Validation" name="validation" icon="i-uil:image-question">
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
</template>
