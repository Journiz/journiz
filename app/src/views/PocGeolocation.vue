<script lang="ts" setup>
import {} from '@ionic/vue'
import { useGeolocationStore } from '~/stores/geolocation'
import { useTeamStore } from '~/stores/team'
import BasicMap from '~/components/BasicMap.vue'

const location = useGeolocationStore()

const startWatchingPosition = () => {
  location.startWatching()
  location.startReporting()
}

const teamStore = useTeamStore()
teamStore.setId('bth1emonizvk3bh')
</script>
<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="#">Retour</IonBackButton>
        </IonButtons>
        <IonTitle>POC Geolocation</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="h-full flex flex-col items-center justify-center">
        <p v-if="teamStore.team">Equipe: {{ teamStore.team.name }}</p>
        <BasicMap class="w-full flex-grow" />
        <IonButton @click="startWatchingPosition"
          >Activer la localisation en background
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
