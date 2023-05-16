<script lang="ts" setup>
import { IonPage } from '@ionic/vue'
import { computed, provide, ref } from 'vue'
import { pageProvideKey, ProvidedPage } from '~/types/Page'

const props = defineProps<{
  class?: string
}>()

const page = ref<typeof IonPage>()
const pageElement = computed(() => {
  return page.value?.$el
})
const providedPage: ProvidedPage = {
  element: pageElement,
  // setBackgroundColor: (color: string) => {
  //   backgroundColor.value = color
  // },
}
provide(pageProvideKey, providedPage)
</script>
<template>
  <IonPage ref="page">
    <IonContent :scroll-y="false">
      <div class="page flex flex-col bg-beige-light" :class="props.class">
        <slot />
      </div>
    </IonContent>
  </IonPage>
</template>
<style>
ion-content {
  font-family: 'filson', sans-serif;
}
</style>
