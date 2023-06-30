<script lang="ts" setup="">
import { computed, onMounted, ref, watch } from 'vue'
import { useIonRouter } from '@ionic/vue'
import Page from '~/components/Page.vue'
import Button from '~/components/design-system/Button.vue'
import { useTeamStore } from '~/stores/team/team'
import { useLogout } from '~/composables/useLogout'
import { tripIsToday } from '~/utils/dates'
import { useGeolocationStore } from '~/stores/geolocation'
import GoCountdown from '~/components/time/GoCountdown.vue'
import illu from '~/assets/img/illustration-waiting.png'
const store = useTeamStore()

const isToday = computed(() => {
  if (!store.trip) return false
  return tripIsToday(store.trip)
})
const logout = useLogout(store.logout)
const router = useIonRouter()

const countdownRunning = ref(false)
const onCountdownEnd = () => {
  router.replace({ name: 'team', query: { justStarted: 'true' } })
}
watch(
  () => store.trip?.status,
  () => {
    if (store.trip?.status === 'playing') {
      countdownRunning.value = true
    }
  }
)

onMounted(() => {
  useGeolocationStore().requestPermission()
})
const title = 'Encore un peu de patience !'
</script>
<template>
  <Page
    class="bg-beige-light flex flex-col px-6 gap-4 text-center text-green-dark"
  >
    <h1 class="font-black text-2xl mb-0 mt-4">
      {{ title }}
    </h1>
    <p class="font-light text-sm">
      Le maitre du jeu va bientôt lancer le départ. Vous serez notifiés au
      commencement.
    </p>
    <div class="relative -mx-6 my-auto flex-shrink">
      <img :src="illu" class="w-full" alt="" />
    </div>
    <p class="font-black">
      En attendant, pourquoi ne pas choisir vos couleurs ?
    </p>
    <div class="flex flex-col gap-2 mb-4">
      <Button :to="{ name: 'team-customize' }" :disabled="!isToday"
        >Personnaliser l'équipe</Button
      >
      <Button @click="logout">Déconnexion</Button>
    </div>
    <GoCountdown :open="countdownRunning" @end="onCountdownEnd" />
  </Page>
</template>
