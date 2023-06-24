<script lang="ts" setup="">
import { inject, onBeforeMount } from 'vue'
import { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  title: string
  name: string
  to: RouteLocationRaw
  icon?: string
  iconActive: string
}>()
const addTab = inject('addTab') as any
onBeforeMount(() => {
  addTab({ ...props, isButtonOnly: true }, false)
})
</script>
<template>
  <slot></slot>
</template>
