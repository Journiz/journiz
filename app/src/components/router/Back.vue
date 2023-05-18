<script lang="ts" setup="">
import { useIonRouter } from '@ionic/vue'
import { computed } from 'vue'
import BackButton from '~/components/router/BackButton.vue'

const props = defineProps<{
  defaultTo?: any
}>()

const backButtonVisible = computed(() => {
  return router.canGoBack() || !!props.defaultTo
})

const router = useIonRouter()
const goBack = () => {
  if (router.canGoBack()) {
    router.back()
  } else if (props.defaultTo) {
    router.navigate(props.defaultTo, 'back', 'replace')
  }
}
</script>
<template>
  <BackButton v-if="backButtonVisible" @click="goBack" />
</template>
