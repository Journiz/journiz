<script lang="ts" setup="">
import { useIonRouter } from '@ionic/vue'
import { useLogout } from '~/composables/useLogout'
import { useUserStore } from '~/stores/user'
import { showModal } from '~/composables/useModal'

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
</script>
<template>
  <div class="flex-grow h-full bg-red/40">
    <div>
      Bonjour {{ userStore.user?.username }}. Trip is
      {{ userStore.trip?.name }}
    </div>
    <div>
      <IonButton @click="logout">Logout</IonButton>
      <IonButton v-if="userStore.trip.status === 'playing'" @click="endTrip"
        >Arreter la partie</IonButton
      >
      <IonButton
        v-if="userStore.trip.status === 'finishing'"
        @click="showScores"
        >Afficher les scores</IonButton
      >
    </div>
  </div>
</template>
