<script lang="ts" setup="">
import { useIonRouter } from '@ionic/vue'
import { computed, toRef } from 'vue'
import BackButton from '~/components/router/BackButton.vue'
import useGoBack from '~/composables/useGoBack'

const props = defineProps<{
  defaultTo?: any
}>()
const router = useIonRouter()
const backButtonVisible = computed(() => {
  return router.canGoBack() || !!props.defaultTo
})
const goBack = useGoBack(toRef(props, 'defaultTo'))
</script>
<template>
  <BackButton v-if="backButtonVisible" @click="goBack" />
</template>
