<script lang="ts" setup="">
import { onBeforeMount, onMounted, provide, reactive } from 'vue'
import { TabData, TabsProvider, TabsProviderKey } from '~/types/tabs'
import TabBar from '~/tabs/TabBar.vue'

const state: TabsProvider = reactive({
  activeTabName: '',
  activeTab: undefined,
  tabs: [],
})
let defaultTabName = ''
provide(TabsProviderKey, state)
provide('addTab', (tab: TabData, defaultSelected = false) => {
  state.tabs.push(tab)
  if (defaultSelected) {
    defaultTabName = tab.name
  }
})
const setActiveTab = (name: string) => {
  state.activeTabName = name
  state.activeTab = state.tabs.find((tab) => tab.name === name)
}

onMounted(() => {
  if (defaultTabName) {
    setActiveTab(defaultTabName)
    return
  }
  setActiveTab(state.tabs[0].name)
})
</script>
<template>
  <div class="relative h-full w-full">
    <slot></slot>
    <div class="absolute z-10 bottom-0 left-0 w-full">
      <TabBar :tabs-provider="state" @set-active-tab="setActiveTab" />
    </div>
  </div>
</template>
