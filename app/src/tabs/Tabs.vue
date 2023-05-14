<script lang="ts" setup="">
import { onMounted, provide, reactive } from 'vue'
import { TabData, TabsProvider, TabsProviderKey } from '~/types/tabs'

const state: TabsProvider = reactive({
  activeTabName: '',
  tabs: [],
})
provide(TabsProviderKey, state)
provide('addTab', (tab: TabData) => {
  state.tabs.push(tab)
})
const setActiveTab = (name: string) => {
  state.activeTabName = name
}

onMounted(() => {
  setActiveTab(state.tabs[0].name)
})
</script>
<template>
  <div class="relative">
    <slot></slot>
    <div class="absolute bottom-0 left-0 w-full p-4">
      <div class="bg-red/40 flex items-center gap-4">
        <button
          v-for="tab in state.tabs"
          :key="tab.name"
          class="flex"
          @click="setActiveTab(tab.name)"
        >
          <span class="text-16px" :class="tab.icon"></span>
          <span>
            {{ tab.title }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
