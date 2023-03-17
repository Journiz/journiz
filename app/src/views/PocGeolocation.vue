<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/vue'
import BasicMap from '~/components/BasicMap.vue'
import { useGeolocationStore } from '~/stores/geolocation'
import { useTeamStore } from '~/stores/team'

const location = useGeolocationStore()

const startWatchingPosition = () => {
  location.startWatching()
  location.startReporting()
}

const teamStore = useTeamStore()
teamStore.setId('bth1emonizvk3bh')
</script>
<template>
  <IonPage class="bg-gray-300 flex flex-col items-center">
    <IonHeader>
      <ion-toolbar>
        <ion-title>POC Geolocation</ion-title>
      </ion-toolbar>
    </IonHeader>

    <p v-if="teamStore.team">Equipe: {{ teamStore.team.name }}</p>
    <BasicMap />
    <ion-button @click="startWatchingPosition"
      >Activer la localisation en background</ion-button
    >
  </IonPage>
</template>
