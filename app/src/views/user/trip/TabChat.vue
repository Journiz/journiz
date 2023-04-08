<script lang="ts" setup="">
import { IonRouterOutlet } from '@ionic/vue'
</script>
<template>
  <IonPage ref="page">
    <IonContent :fullscreen="true">
      <IonRouterOutlet />
    </IonContent>
  </IonPage>
</template>
