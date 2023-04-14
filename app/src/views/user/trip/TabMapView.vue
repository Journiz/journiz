<script lang="ts" setup="">
import { IonToolbar } from '@ionic/vue'
import { ref } from 'vue'

const page = ref()
</script>
<template>
  <IonPage ref="page">
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Map</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div class="bg-red-200">Hello</div>
    </IonContent>
  </IonPage>
</template>
