<script lang="ts" setup="">
import { computed, inject, onBeforeMount, onMounted } from 'vue'
import { TabsProviderKey } from '~/types/tabs'

const props = defineProps<{
  title: string
  name: string
  icon?: string
  defaultSelected?: boolean
}>()
const addTab = inject('addTab') as any
onBeforeMount(() => {
  addTab(props, props.defaultSelected)
})
onMounted(() => {})

const tabsProvider = inject(TabsProviderKey)
const isActive = computed(() => {
  return tabsProvider!.activeTabName === props.name
})
</script>
<template>
  <div class="w-full h-full relative" :class="isActive ? '' : 'hidden'">
    <slot></slot>
  </div>
</template>
