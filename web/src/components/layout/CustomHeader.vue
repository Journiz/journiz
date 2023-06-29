<script lang="ts" setup>
import { RouteLocationRaw, useRouter } from 'vue-router'
import { PropType } from 'vue'
import PageTitle from '~/components/PageTitle.vue'
import SquareButton from '~/components/buttons/SquareButton.vue'

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
  returnTo: {
    type: Object as PropType<RouteLocationRaw>,
    required: false,
    default: undefined,
  },
})
const onBack = () => {
  if (props.returnTo) {
    router.push(props.returnTo)
  } else {
    router.back()
  }
}
</script>
<template>
  <header class="flex justify-between w-full items-center">
    <page-title>{{ title }}</page-title>
    <div class="flex gap-5">
      <square-button
        v-if="!noDisplayReturn"
        icon="back"
        color="white"
        @click="onBack"
      />
      <slot />
    </div>
  </header>
</template>
