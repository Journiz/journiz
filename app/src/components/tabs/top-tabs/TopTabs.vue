<script lang="ts" setup="">
import { onMounted, provide, reactive, ref } from 'vue'
import { useEventBus } from '@vueuse/core'
import { TabData, TabsProvider, TabsProviderKey } from '~/types/tabs'

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
  updateTranslateValue()
}

onMounted(() => {
  if (state.tabs.length === 0) return
  if (defaultTabName) {
    setActiveTab(defaultTabName)
    return
  }
  setActiveTab(state.tabs[0].name)
})

// Tab bar
const translate = ref<number>()
const width = ref<number>()
const buttons = ref()
const updateTranslateValue = () => {
  const activeButton = buttons.value?.find(
    (button: any) => button.dataset.tabName === state.activeTabName
  )
  if (!activeButton) return
  translate.value = activeButton.offsetLeft
  width.value = activeButton.offsetWidth
  return activeButton.offsetLeft !== 0
}
const mounted = () => {
  // we "await for component to be ready"
  if (updateTranslateValue()) {
    return
  }
  requestAnimationFrame(mounted)
}

useEventBus<string>('top-tabs').on((tabName) => {
  setActiveTab(tabName)
})

onMounted(mounted)
defineExpose({
  state,
})
</script>
<template>
  <div class="flex-grow col h-full">
    <div class="px-8 bg-white flex justify-around gap-8 relative">
      <div
        class="absolute bottom-0 left-0 bg-theme h-1 rounded-full transition-all duration-200 ease-out-quint"
        :style="{
          translate: translate + 'px',
          width: width + 'px',
        }"
      ></div>
      <button
        v-for="tab in state.tabs"
        ref="buttons"
        :key="tab.name"
        :data-tab-name="tab.name"
        class="flex-grow pb-5 font-medium btn-animation"
        @click="setActiveTab(tab.name)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="relative w-full flex-grow flex-shrink max-h-full">
      <slot></slot>
    </div>
  </div>
</template>
