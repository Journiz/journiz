<script lang="ts" setup="">
import { useIonRouter } from '@ionic/vue'
import { computed } from 'vue'
import { useLogout } from '~/composables/useLogout'
import { useUserStore } from '~/stores/user'
import { showModal } from '~/composables/useModal'
import TripCountdown from '~/components/time/TripCountdown.vue'

const userStore = useUserStore()
const logout = useLogout(userStore.logout)
const router = useIonRouter()

const endTrip = async () => {
  const result = await showModal(
    'On arrête ?',
    `<p>Cette commande clôt le jeu et envoie une notifications aux équipes pour rentrer au point de ralliement. </p>
<p class="text-red font-bold">Cette action est définitive. </p>`,
    [
      {
        title: 'Oui, on arrête',
        color: 'red',
        actionName: 'stop',
      },
      {
        title: 'Non, on continue le jeu',
        color: 'green',
        actionName: 'cancel',
      },
    ],
    'end'
  )
  if (result === 'stop') {
    await userStore.endTrip()
  }
}
const showScores = async () => {
  await userStore.showTripScores()
  router.navigate({ name: 'user-end' }, 'root', 'replace')
}
const userName = computed(() => userStore.user?.username)

const warn = async () => {
  await showModal(
    'Attention',
    `<p>Vous êtes sur le point de quitter la partie en cours. </p>`,
    [
      {
        actionName: 'ok',
        title: 'Ok',
        color: 'theme',
      },
    ],
    'alarm'
  )
}
</script>
<template>
  <div class="flex-grow h-full bg-red/40">
    <div>
      Bonjour {{ userName }}. Trip is
      {{ userStore.trip?.name }}
    </div>
    <div class="col">
      <IonButton @click="warn">Warn </IonButton>
      <IonButton @click="logout">Logout</IonButton>
      <IonButton v-if="userStore.trip?.status === 'playing'" @click="endTrip"
        >Arreter la partie</IonButton
      >
      <IonButton
        v-if="userStore.trip?.status === 'finishing'"
        @click="showScores"
      >
        Afficher les scores
      </IonButton>
      <div class="mt-4 self-center">
        <TripCountdown v-if="userStore.trip" :trip="userStore.trip" />
      </div>
    </div>
  </div>
</template>
