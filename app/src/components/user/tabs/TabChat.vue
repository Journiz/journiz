<script lang="ts" setup="">
import { IonRouterOutlet } from '@ionic/vue'
</script>
<template>
  <IonPage ref="page">
    <IonContent :scroll-y="false">
      <IonRouterOutlet />
    </IonContent>
  </IonPage>
</template>
