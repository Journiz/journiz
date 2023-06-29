<script lang="ts" setup="">
import Back from '~/components/router/Back.vue'
import { showModal } from '~/composables/useModal'
import warnSecurity from '~/utils/warnSecurity'

defineProps<{
  title: string
  subtitle: string
  backTo?: any
}>()
</script>
<template>
  <div class="px-6 pt-1 pb-6 flex items-center gap-4 bg-white">
    <div class="w-9 flex-shrink-0">
      <Back :default-to="backTo" />
    </div>
    <div class="flex flex-col flex-grow items-center text-center">
      <span class="font-light text-sm">{{ subtitle }}</span>
      <span class="text-xl font-black">{{ title }}</span>
    </div>
    <div class="w-9 flex-shrink-0 translate-x-4">
      <button
        class="i-uil:info-circle text-red text-24px btn-animation"
        @click="warnSecurity"
      ></button>
    </div>
  </div>
</template>
