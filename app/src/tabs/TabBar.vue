<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { Capacitor } from '@capacitor/core'
import { TabsProvider } from '~/types/tabs'
import TabBarButton from '~/tabs/TabBarButton.vue'

const props = defineProps<{
  tabsProvider: TabsProvider
}>()
const emit = defineEmits(['setActiveTab'])
const setActiveTab = (name: string) => {
  emit('setActiveTab', name)
}

const buttons = ref()
const translateValue = ref<number>()
const updateTranslateValue = () => {
  const activeButton = buttons.value?.find(
    (button: any) =>
      button.$el.dataset.tabName === props.tabsProvider.activeTabName
  )
  if (!activeButton) return
  const rect = activeButton.$el.getBoundingClientRect()
  translateValue.value = rect.left + rect.width / 2
  return rect.left !== 0
}
const ready = ref(false)
const mounted = () => {
  // we "await for component to be ready"
  if (updateTranslateValue()) {
    requestAnimationFrame(() => {
      ready.value = true
    })
    return
  }
  requestAnimationFrame(mounted)
}
onMounted(mounted)
watch(
  () => props.tabsProvider.activeTabName,
  async () => {
    await nextTick()
    updateTranslateValue()
  }
)
const bottomPadding = getComputedStyle(
  document.documentElement
).getPropertyValue('--ion-safe-area-bottom')
const isRecentIphone =
  Capacitor.getPlatform() === 'ios' && parseFloat(bottomPadding) > 0
const paddingClass = isRecentIphone ? 'pb-0' : 'pb-4'
</script>
<template>
  <div
    class="relative w-full h-full items-center justify-center gap-2 grid tabbar-shadow"
    :class="paddingClass"
    p="x-4 t-4"
    :style="{
      gridTemplateColumns: `repeat(${tabsProvider.tabs.length}, 1fr)`,
    }"
  >
    <div
      class="absolute pointer-events-none top-full left-0 w-full h-screen bg-white"
    ></div>
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div
        class="absolute top-0 left-0 h-full flex flex-col"
        :class="{
          'transition duration-200': ready,
        }"
        :style="{
          transform: `translateX(calc(-50% + ${translateValue}px))`,
        }"
      >
        <div class="flex">
          <div class="bg-white w-screen"></div>
          <svg
            class="h-8.5 -mx-1"
            viewBox="0 0 84 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H4.29999C6.31999 0 8.01999 1.5 8.26999 3.5C9.34999 12.18 14.77 34 42 34C69.23 34 74.65 12.18 75.73 3.5C75.98 1.5 77.68 0 79.7 0H84V34H0V0Z"
              fill="white"
            />
          </svg>
          <div class="bg-white w-screen"></div>
        </div>
        <div class="w-full bg-white flex-grow"></div>
      </div>
    </div>
    <div
      class="absolute top-0 left-0 bg-red rounded-full w-15 h-15 flex items-center justify-center"
      :class="{
        'transition duration-200': ready,
      }"
      :style="{
        transform: `translate(calc(-50% + ${translateValue}px), -50%)`,
      }"
    ></div>
    <TabBarButton
      v-for="tab in tabsProvider.tabs"
      :key="tab.name"
      ref="buttons"
      :tab="tab"
      :is-active="tabsProvider.activeTabName === tab.name"
      @click="setActiveTab(tab.name)"
    />
  </div>
</template>
<style scoped>
.tabbar-shadow {
  filter: drop-shadow(0 0px 6px rgba(0, 0, 0, 0.15));
}
</style>
