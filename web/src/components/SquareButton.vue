<script setup lang="ts">
import { computed } from 'vue'
import icons from '~/assets/icons'
const props = defineProps({
  activated: {
    type: Boolean,
    default: false,
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
  <div
    class="w-12 h-12 rounded-lg flex items-center justify-center text-white cursor-pointer transition-all hover:bg-blue-600"
    :class="props.activated ? 'bg-blue-600' : 'bg-blue-400'"
  >
    <Icon class="h-6 w-6" />
  </div>
</template>
