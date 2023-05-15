<script lang="ts" setup="">
import { computed, inject, onBeforeMount, onMounted } from 'vue'
import { TabsProviderKey } from '~/types/tabs'

const props = defineProps<{
  title: string
  name: string
  icon: string
}>()

const addTab = inject('addTab') as any
onBeforeMount(() => {
  addTab(props)
})
onMounted(() => {
  console.log('tab mounted')
})

const tabsProvider = inject(TabsProviderKey)
const isActive = computed(() => {
  return tabsProvider!.activeTabName === props.name
})
</script>
<template>
  <div class="w-full h-full" :class="isActive ? '' : 'hidden'">
    <slot></slot>
  </div>
</template>
