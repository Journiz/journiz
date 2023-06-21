<script lang="ts" setup="">
import { useIonRouter } from '@ionic/vue'
import { computed } from 'vue'
import { useLogout } from '~/composables/useLogout'
import { useUserStore } from '~/stores/user'
import { showModal } from '~/composables/useModal'
import TripCountdown from '~/components/time/TripCountdown.vue'
import Header from '~/components/design-system/Header.vue'
import Button from '~/components/design-system/Button.vue'

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
  <div v-if="userStore.user" class="flex flex-col h-full">
    <Header :title="userStore.trip?.name ?? ''" subtitle="Paramètres" />
    <div class="flex-grow bg-beige-light p-4 flex flex-col gap-4">
      <div
        class="shadow bg-white rounded-lg p-6 flex flex-col text-green-dark gap-6"
      >
        <span class="text-center text-xl font-black">
          Un problème ? Un imprévu ?
        </span>
        <Button color="green" @click="logout">Arrêter la partie</Button>
        <div class="flex items-start gap-2">
          <span
            class="i-ion:information-circle flex-shrink-0 text-red text-28px"
          ></span>
          <p class="text-sm font-light italic">
            Cette commande clôt le jeu et envoie une notifications aux équipes
            pour rentrer au point de ralliement. <br />
            Cette action est
            <span class="text-red font-medium">définitive</span>.
          </p>
        </div>
      </div>
      <Button color="green" @click="logout">Se déconnecter</Button>
    </div>
  </div>
</template>
