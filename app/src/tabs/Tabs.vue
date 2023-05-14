<script lang="ts" setup="">
import { onMounted, provide, reactive } from 'vue'
import { TabData, TabsProvider, TabsProviderKey } from '~/types/tabs'
import TabBar from '~/tabs/TabBar.vue'

const state: TabsProvider = reactive({
  activeTabName: '',
  activeTab: null,
  tabs: [],
})
provide(TabsProviderKey, state)
provide('addTab', (tab: TabData) => {
  state.tabs.push(tab)
})
const setActiveTab = (name: string) => {
  state.activeTabName = name
  state.activeTab = state.tabs.find((tab) => tab.name === name)
}

onMounted(() => {
  setActiveTab(state.tabs[0].name)
})
</script>
<template>
  <div class="relative">
    <slot></slot>
    <div class="absolute bottom-0 left-0 w-full">
      <TabBar :tabs-provider="state" @set-active-tab="setActiveTab" />
    </div>
  </div>
</template>
