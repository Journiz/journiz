<script lang="ts" setup="">
import { IonPage, IonHeader, IonContent } from '@ionic/vue'
</script>
<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="#">Retour</IonBackButton>
        </IonButtons>
        <IonTitle>Notif</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <p>Notif reçue !</p>
    </IonContent>
  </IonPage>
</template>
