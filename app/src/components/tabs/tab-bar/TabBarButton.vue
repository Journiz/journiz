<script lang="ts" setup="">
import { TabData } from '~/types/tabs'

defineProps<{
  tab: TabData
  isActive: boolean
}>()
</script>
<template>
  <button
    class="block relative flex flex-col items-center gap-3"
    :data-tab-name="tab.name"
  >
    <span
      class="text-24px block transition duration-200 transform relative w-24px h-24px"
      :class="{
        '-translate-y-7': isActive,
      }"
    >
      <span
        :class="[
          tab.icon,
          {
            'opacity-0': isActive,
          },
        ]"
        class="absolute inset-0 w-full h-full text-black/20 transition duration-200"
      ></span>
      <span
        class="absolute inset-0 w-full h-full text-white transition duration-200"
        :class="[
          tab.iconActive ?? tab.icon,
          {
            'opacity-0': !isActive,
          },
        ]"
      ></span>
    </span>
    <span class="text-11px">
      {{ tab.title }}
    </span>
  </button>
</template>
