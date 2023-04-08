<script lang="ts" setup="">
import { IonToolbar } from '@ionic/vue'
</script>
<template>
  <IonPage ref="page">
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Conversations</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div>Conversations</div>
    </IonContent>
  </IonPage>
</template>
