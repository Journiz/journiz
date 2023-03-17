<script lang="ts" setup>
import { IonPage } from '@ionic/vue'
import HelloJourniz from '~/components/HelloJourniz.vue'
</script>
<template>
  <IonPage>
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Jouuusssr</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <HelloJourniz class="h-full" />
    </IonContent>
  </IonPage>
</template>
<style></style>
