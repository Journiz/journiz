<script lang="ts" setup>
import { IonButton } from '@ionic/vue'
</script>
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col">
      <h1 class="font-bold text-center">Bienvenue</h1>
      <IonButton router-link="/user-login">Je suis maître du jeu</IonButton>
      <IonButton router-link="/join-trip">Je suis participant</IonButton>
      <IonButton router-link="/user/tab2" color="danger">Interdit</IonButton>
      <h1 class="font-bold mt-4 text-center">Les Pocs</h1>
      <IonButton color="light" router-link="/geolocation"
        >Go to geolocation</IonButton
      >
    </div>
  </div>
</template>
