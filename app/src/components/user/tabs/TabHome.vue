<script lang="ts" setup="">
import { useIonRouter } from '@ionic/vue'
import { useLogout } from '~/composables/useLogout'
import { useUserStore } from '~/stores/user'
import { showModal } from '~/composables/useModal'
import Header from '~/components/design-system/Header.vue'
import Button from '~/components/design-system/Button.vue'

const store = useUserStore()
const logout = useLogout(store.logout)
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
    await store.endTrip()
  }
}
const showScores = async () => {
  const result = await showModal(
    'On affiche les scores ?',
    `Les joueurs pourront voir leurs résultats et le podium.`,
    [
      {
        title: 'Oui !',
        color: 'green',
        actionName: 'stop',
      },
      {
        title: 'Pas encore',
        color: 'red',
        actionName: 'cancel',
      },
    ],
    'end'
  )
  if (result === 'stop') {
    await store.endTrip()
  }
  await store.showTripScores()
  router.navigate({ name: 'user-end' }, 'root', 'replace')
}
</script>
<template>
  <div v-if="store.user" class="flex flex-col h-full">
    <Header
      :title="store.trip?.name ?? ''"
      subtitle="Paramètres"
      :not-display-infos="true"
    />
    <div
      v-if="store.trip?.status === 'playing'"
      class="flex-grow bg-beige-light p-4 flex flex-col gap-4"
    >
      <div
        class="shadow bg-white rounded-lg p-6 flex flex-col text-green-dark gap-6"
      >
        <span class="text-center text-xl font-black">
          Un problème ? Un imprévu ?
        </span>
        <Button color="green" @click="endTrip">Arrêter la partie</Button>
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
    </div>
    <div v-else class="flex-grow bg-beige-light p-4 flex flex-col gap-4">
      <div
        class="shadow bg-white rounded-lg p-6 flex flex-col text-green-dark gap-6"
      >
        <span class="text-center text-xl font-black">
          Le jeu est en train de se terminer.
        </span>
        <Button color="green" @click="showScores">Afficher les scores</Button>
        <div class="flex items-start gap-2">
          <span
            class="i-ion:information-circle flex-shrink-0 text-red text-28px"
          ></span>
          <p class="text-sm font-light italic">
            Cette commande calcule le classement et affiche les scores sur les
            écrans des équipes. <br />
            Assurez-vous d'avoir validé toutes les réponses.
          </p>
        </div>
      </div>
      <Button @click="logout">Se déconnecter</Button>
    </div>
  </div>
</template>
