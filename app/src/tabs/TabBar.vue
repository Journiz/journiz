<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
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
</script>
<template>
  <div
    class="relative w-full h-full items-center justify-center gap-2 grid"
    p="x-4 b-4 t-4"
    :style="{
      gridTemplateColumns: `repeat(${tabsProvider.tabs.length}, 1fr)`,
    }"
  >
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden tabbar-shadow"
    >
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
    <TabBarButton
      v-for="tab in tabsProvider.tabs"
      :key="tab.name"
      ref="buttons"
      :tab="tab"
      :is-active="tabsProvider.activeTabName === tab.name"
      @click="setActiveTab(tab.name)"
    />
    <div
      class="absolute top-0 left-0 bg-red rounded-full w-15 h-15 flex items-center justify-center"
      :class="{
        'transition duration-200': ready,
      }"
      :style="{
        transform: `translate(calc(-50% + ${translateValue}px), -50%)`,
      }"
    >
      <transition mode="out-in" name="fab-icon">
        <span
          :key="tabsProvider.activeTabName"
          class="text-24px text-white"
          :class="tabsProvider.activeTab?.icon"
        ></span>
      </transition>
    </div>
  </div>
</template>
<style scoped>
.tabbar-shadow {
  filter: drop-shadow(0 0px 6px rgba(0, 0, 0, 0.1));
}
.fab-icon-enter-active,
.fab-icon-leave-active {
  transition: all 0.1s ease;
}

.fab-icon-enter-from,
.fab-icon-leave-to {
  opacity: 0;
  transform: scale(0.4);
}
</style>
