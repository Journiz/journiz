<script lang="ts" setup>
import { TabData } from '~/types/tabs'

defineProps<{
  tabs: TabData[]
}>()
const emit = defineEmits(['setActiveTab'])
const setActiveTab = (name: string) => {
  emit('setActiveTab', name)
}
</script>
<template>
  <div class="w-full h-full relative flex items-center gap-4">
    <button
      v-for="tab in tabs"
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
</template>
