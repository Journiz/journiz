<script lang="ts" setup="">
import { ref } from 'vue'
import { IonModal } from '@ionic/vue'
import { useLogout } from '~/composables/useLogout'
import { useUserStore } from '~/stores/user'
import PickTrip from '~/components/user/PickTrip.vue'
import usePage from '~/composables/usePage'

const userStore = useUserStore()
const logout = useLogout(userStore.logout)

const page = usePage()
const switchTripModalOpen = ref(false)
</script>
<template>
  <div class="flex-grow h-full bg-red/40">
    <div>
      Bonjour {{ userStore.user?.username }}. Trip is
      {{ userStore.trip?.name }}
    </div>
    <div>
      <IonButton @click="switchTripModalOpen = true">Switch trip</IonButton>
      <IonButton @click="logout">Logout</IonButton>
    </div>

    <IonModal
      :is-open="switchTripModalOpen"
      :can-dismiss="true"
      :presenting-element="page?.element"
      @did-dismiss="switchTripModalOpen = false"
    >
      <ion-header>
        <ion-toolbar>
          <ion-title>Sorties</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="switchTripModalOpen = false"
              >Annuler
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <PickTrip @trip-change="switchTripModalOpen = false" />
      </ion-content>
    </IonModal>
    <!--    <teleport to="#trip-tabs-page">-->
    <!--    </teleport>-->
  </div>
</template>
