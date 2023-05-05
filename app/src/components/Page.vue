<script lang="ts" setup>
import { IonPage } from '@ionic/vue'
</script>
<template>
  <IonPage>
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
