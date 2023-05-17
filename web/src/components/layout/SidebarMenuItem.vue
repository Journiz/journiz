<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import icons from '~/assets/icons'

const route = useRoute()
const currentPath = computed(() => {
  return route.path
})

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
    validator(value: string) {
      if (Object.keys(icons).includes(value)) {
        return true
      }
      console.warn(
        '⚠️ The icon name' +
          value +
          "of the props doesn't exist in icons.ts, import or correct string"
      )
      return false
    },
  },
})

const Icon = computed(() => icons[props.icon])
</script>
<template>
  <router-link :to="path" class="min-w-41 mb-6">
    <div
      class="flex flex-row items-center p-2 relative"
      :class="currentPath.startsWith(path) ? 'text-green' : 'text-white-off'"
    >
      <Icon class="sidebar-icon mr-2" />
      <span
        class="text-lg"
        :class="currentPath.startsWith(path) ? 'font-bold' : ''"
        >{{ name }}</span
      >
    </div>
  </router-link>
</template>
<style scoped>
.sidebar-icon {
  height: auto;
  width: 16px;
}
</style>
