<script lang="ts" setup="">
import Page from '~/components/Page.vue'
import Tabs from '~/components/tabs/tab-bar/Tabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TabSettings from '~/components/team/tabs/TabSettings.vue'
</script>
<template>
  <Page id="trip-tabs-page">
    <Tabs class="flex-grow">
      <Tab title="Paramètres" name="settings" icon="i-uil:cog">
        <TabSettings />
      </Tab>
      <Tab title="Carte" name="map" icon="i-uil:map" default-selected>
        Map
      </Tab>
      <Tab title="Validation" name="validation" icon="i-uil:image-question">
        Score
      </Tab>
      <Tab title="Messages" name="chat" icon="i-ph:chats-circle-bold">
        CHat
      </Tab>
    </Tabs>
  </Page>
</template>
