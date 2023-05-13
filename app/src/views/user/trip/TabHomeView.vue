<script lang="ts" setup="">
import { IonButtons, IonModal, IonToolbar } from '@ionic/vue'
import { ref } from 'vue'
import { useLogout } from '~/composables/useLogout'
import PickTrip from '~/components/user/PickTrip.vue'
import { useUserStore } from '~/stores/user'
import Page from '~/components/Page.vue'

const userStore = useUserStore()
const logout = useLogout(userStore.logout)

const page = ref()
const switchTripModalOpen = ref(false)
</script>
<template>
  <Page class="bg-white">
    <div class="flex-grow bg-red/40">
      <div>
        Bonjour {{ userStore.user?.username }}. Trip is
        {{ userStore.trip?.name }}
      </div>
      <div>
        <IonButton @click="switchTripModalOpen = true">Switch trip</IonButton>
        <IonButton @click="logout">Logout</IonButton>
      </div>
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
  </Page>
</template>
