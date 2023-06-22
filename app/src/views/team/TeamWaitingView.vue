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

const store = useTeamStore()

const isToday = computed(() => {
  if (!store.trip) return false
  return tripIsToday(store.trip)
})
const logout = useLogout(store.logout)
const router = useIonRouter()

const countdownRunning = ref(false)
const onCountdownEnd = () => router.replace({ name: 'team' })
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
</script>
<template>
  <Page class="bg-beige-light">
    Ben là il se passe rien de spécial quoi
    <div>
      <Button :to="{ name: 'team-customize' }" :disabled="!isToday"
        >Personnaliser l'équipe</Button
      >
      <Button @click="logout">Déconnexion</Button>
    </div>
    <GoCountdown :open="countdownRunning" @end="onCountdownEnd" />
  </Page>
</template>
