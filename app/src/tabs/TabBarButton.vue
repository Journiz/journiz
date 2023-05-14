<script lang="ts" setup="">
import { TabData } from '~/types/tabs'

defineProps<{
  tab: TabData
  isActive: boolean
}>()
</script>
<template>
  <button
    class="btn-animation block relative flex flex-col items-center gap-3"
    :data-tab-name="tab.name"
  >
    <span
      class="text-24px text-black/20 block transition duration-200 transform"
      :class="[tab.icon, isActive ? 'opacity-0' : 'text-black/20']"
    ></span>
    <span class="text-11px">
      {{ tab.title }}
    </span>
  </button>
</template>
