<script lang="ts" setup="">
import Page from '~/components/Page.vue'
import Tabs from '~/tabs/Tabs.vue'
import Tab from '~/tabs/Tab.vue'
import TabHome from '~/components/user/tabs/TabHome.vue'
import TabMap from '~/components/user/tabs/TabMap.vue'
import TabChat from '~/components/user/tabs/TabChat.vue'
</script>
<template>
  <Page class="">
    <keep-alive>
      <Tabs class="flex-grow">
        <Tab title="Paramètres" name="settings" icon="i-uil:cog">
          <TabHome />
        </Tab>
        <Tab title="Carte" name="map" icon="i-uil:map">
          <TabMap />
        </Tab>
        <Tab title="Messages" name="chat" icon="i-ph:chats-circle-bold">
          <TabChat />
        </Tab>
      </Tabs>
    </keep-alive>
  </Page>
</template>
