<script lang="ts" setup="">
import { computed, inject, onBeforeMount } from 'vue'
import { TabData, TabsProviderKey } from '~/types/tabs'

const props = defineProps<{
  title: string
  name: string
  icon: string
}>()

const addTab = inject('addTab') as any
onBeforeMount(() => {
  addTab(props)
})

const tabsProvider = inject(TabsProviderKey)
const isActive = computed(() => {
  return tabsProvider!.activeTabName === props.name
})
</script>
<template>
  <div :class="isActive ? '' : 'hidden'">
    <slot></slot>
  </div>
</template>
