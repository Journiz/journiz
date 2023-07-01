<script lang="ts" setup="">
import { computed, inject, onBeforeMount, onMounted, provide } from 'vue'
import { SetBadgeKey, SetTabBadgeKey, TabsProviderKey } from '~/types/tabs'

const props = defineProps<{
  title: string
  name: string
  icon?: string
  iconActive?: string
  defaultSelected?: boolean
}>()
const addTab = inject('addTab') as any
onBeforeMount(() => {
  addTab({ ...props, badge: 0 }, props.defaultSelected)
})
onMounted(() => {})

const tabsProvider = inject(TabsProviderKey)
const isActive = computed(() => {
  return tabsProvider!.activeTabName === props.name
})

const setTabBadge = inject(SetTabBadgeKey) as any
provide(SetBadgeKey, (badge: number) => {
  setTabBadge(props.name, badge)
})
</script>
<template>
  <div class="w-full h-full relative" :class="isActive ? '' : 'hidden'">
    <slot></slot>
  </div>
</template>
