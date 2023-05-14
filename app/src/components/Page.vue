<script lang="ts" setup>
import { IonPage } from '@ionic/vue'
import { computed, provide, ref } from 'vue'
const page = ref<typeof IonPage>()
const pageElement = computed(() => {
  return page.value?.$el
})
provide('pageElement', pageElement)
</script>
<template>
  <IonPage ref="page">
    <IonContent :scroll-y="false">
      <div class="page flex flex-col">
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
