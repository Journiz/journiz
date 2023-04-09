<script lang="ts" setup="">
import { IonButtons, IonModal, IonToolbar } from '@ionic/vue'
import { ref } from 'vue'
import { useLogout } from '~/composables/useLogout'
import PickTrip from '~/components/user/PickTrip.vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const logout = useLogout(userStore.logout)

const page = ref()
const switchTripModalOpen = ref(false)
</script>
<template>
  <IonPage ref="page">
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Accueil user</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div>
        Bonjour {{ userStore.user?.username }}. Trip is
        {{ userStore.trip?.name }}
      </div>
      <div>
        <IonButton @click="switchTripModalOpen = true">Switch trip </IonButton>
        <IonButton @click="logout">Logout</IonButton>
      </div>

      <ion-modal
        :is-open="switchTripModalOpen"
        :can-dismiss="true"
        :presenting-element="page?.$el"
        @did-dismiss="switchTripModalOpen = false"
      >
        <ion-header>
          <ion-toolbar>
            <ion-title>Sorties</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="switchTripModalOpen = false"
                >Annuler</ion-button
              >
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <PickTrip @trip-change="switchTripModalOpen = false" />
        </ion-content>
      </ion-modal>
    </IonContent>
  </IonPage>
</template>
