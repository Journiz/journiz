<script lang="ts" setup>
import { useRouter } from 'vue-router'
import PageTitle from '~/components/PageTitle.vue'
import SquareButton from '~/components/SquareButton.vue'
import DefaultButton from '~/components/DefaultButton.vue'

const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  noDisplayReturn: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <header class="flex justify-between w-full items-center">
    <page-title>{{ title }}</page-title>
    <div class="flex gap-5">
      <square-button
        v-if="!noDisplayReturn"
        icon="back"
        :action="router.back"
      />
      <slot />
    </div>
  </header>
</template>
