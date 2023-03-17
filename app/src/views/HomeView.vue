<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue'
import HelloJourniz from '~/components/HelloJourniz.vue'
</script>
<template>
  <ion-page class="bg-gray-300 flex flex-col items-center">
    <ion-header>
      <ion-toolbar>
        <ion-title>Journiz</ion-title>
      </ion-toolbar>
    </ion-header>
    <HelloJourniz class="my-auto" />
  </ion-page>
</template>
