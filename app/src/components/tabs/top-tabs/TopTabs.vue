<script lang="ts" setup="">
import { onMounted, provide, reactive } from 'vue'
import { TabData, TabsProvider, TabsProviderKey } from '~/types/tabs'
import Header from '~/components/design-system/Header.vue'
import { useUserStore } from '~/stores/user'

const store = useUserStore()

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
  if (state.tabs.length === 0) return
  if (defaultTabName) {
    setActiveTab(defaultTabName)
    return
  }
  setActiveTab(state.tabs[0].name)
})
</script>
<template>
  <div class="h-full w-full flex flex-col">
    <Header :title="store.trip.name" subtitle="Carte" />
    <div class="px-8 bg-white flex justify-between">
      <button
        v-for="tab in state.tabs"
        :key="tab.name"
        @click="setActiveTab(tab.name)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="relative w-full flex-grow bg-blue">
      <slot></slot>
    </div>
  </div>
</template>
