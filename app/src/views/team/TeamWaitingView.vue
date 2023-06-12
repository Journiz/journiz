<script lang="ts" setup="">
import { computed, ref, watch } from 'vue'
import gsap from 'gsap'
import { useIonRouter } from '@ionic/vue'
import Page from '~/components/Page.vue'
import Button from '~/components/design-system/Button.vue'
import { useTeamStore } from '~/stores/team/team'
import { useLogout } from '~/composables/useLogout'
import { tripIsToday } from '~/utils/dates'
import Modal from '~/components/modal/Modal.vue'

const store = useTeamStore()

const isToday = computed(() => {
  if (!store.trip) return false
  return tripIsToday(store.trip)
})
const logout = useLogout(store.logout)
const router = useIonRouter()
const rawCounter = ref(3.99)
const counter = computed(() => Math.floor(rawCounter.value))
const modalOpen = ref(false)
watch(
  () => store.trip?.status,
  async () => {
    if (store.trip?.status === 'playing') {
      modalOpen.value = true
      await gsap.to(rawCounter, { value: 0, duration: 4, ease: 'linear' })
      router.replace({ name: 'team' })
    }
  }
)
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
    <Modal layout="window" :is-open="modalOpen">
      <div>{{ counter > 0 ? counter : 'Go !' }}</div>
    </Modal>
  </Page>
</template>
