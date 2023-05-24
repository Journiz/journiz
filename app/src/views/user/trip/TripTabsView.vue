<script lang="ts" setup="">
import Page from '~/components/Page.vue'
import Tabs from '~/components/tabs/Tabs.vue'
import Tab from '~/components/tabs/Tab.vue'
import TabHome from '~/components/user/tabs/TabHome.vue'
import TabMap from '~/components/user/tabs/TabMap.vue'
import TabChat from '~/components/user/tabs/TabChat.vue'
import TabValidation from '~/components/user/tabs/TabValidation.vue'
</script>
<template>
  <keep-alive>
    <Page id="trip-tabs-page">
      <Tabs class="flex-grow">
        <Tab title="Paramètres" name="settings" icon="i-uil:cog">
          <TabHome />
        </Tab>
        <Tab title="Carte" name="map" icon="i-uil:map" default-selected>
          <TabMap />
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
