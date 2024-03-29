<script lang="ts" setup="">
import { onMounted, provide, reactive } from 'vue'
import {
  SetBadgeKey,
  SetTabBadgeKey,
  TabData,
  TabsProvider,
  TabsProviderKey,
} from '~/types/tabs'
import TabBar from '~/components/tabs/tab-bar/TabBar.vue'

const state: TabsProvider = reactive({
  activeTabName: '',
  activeTab: undefined,
  tabs: [],
})
const emit = defineEmits<{
  tabChange: [tabName: string]
}>()
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
  emit('tabChange', name)
}
provide(SetTabBadgeKey, (tabName: string, badge: number) => {
  const i = state.tabs.findIndex((tab) => tab.name === tabName)
  if (i < 0) {
    return
  }
  state.tabs[i].badge = badge
})

onMounted(() => {
  if (defaultTabName) {
    setActiveTab(defaultTabName)
    return
  }
  setActiveTab(state.tabs[0].name)
})
defineExpose({
  state,
  setActiveTab,
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
