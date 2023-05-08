<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import icons from '~/assets/icons'

const route = useRoute()
const currentPath = computed(() => route.path)

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
      class="flex flex-row items-center p-2 rounded-s-lg relative"
      :class="
        path === currentPath
          ? 'bg-white-off text-green custom-shadow invert-rounded'
          : 'text-white-off'
      "
    >
      <Icon class="sidebar-icon mr-2" />
      <span
        :class="path === currentPath ? 'text-base font-extrabold' : 'text-lg'"
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
.custom-shadow {
  box-shadow: inset 1px 0px 6px rgba(0, 0, 0, 0.17);
}
.invert-rounded::before {
  content: '';
  position: absolute;
  background-color: transparent;
  top: -16px;
  right: 0;
  border-bottom-right-radius: 8px;
  height: 16px;
  width: 8px;
  box-shadow: 0 8px 0 0 #fff;
}
.invert-rounded::after {
  content: '';
  position: absolute;
  background-color: transparent;
  bottom: -16px;
  right: 0;
  border-top-right-radius: 8px;
  height: 16px;
  width: 8px;
  box-shadow: 0 -8px 0 0 #fff;
}
</style>
