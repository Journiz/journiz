<script setup="">
import { computed, ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { useUserStore } from '~/stores/user'
import Page from '~/components/Page.vue'
import Button from '~/components/design-system/Button.vue'
import Back from '~/components/router/Back.vue'
import { showModal } from '~/composables/useModal'
import { tripIsToday } from '~/utils/dates'
import GoCountdown from '~/components/time/GoCountdown.vue'
import TeamAvatar from '~/components/team/TeamAvatar.vue'

const router = useIonRouter()
const store = useUserStore()
const teams = computed(() => store.trip?.expand?.teams ?? [])
const startingPending = ref(false)

const countdownRunning = ref(false)
const onCountdownEnd = () => {
  router.navigate({ name: 'user-trip-tabs' }, 'root', 'replace')
}

const startTrip = async () => {
  if (!store.trip) return
  const isToday = tripIsToday(store.trip)
  const action = await showModal(
    'On démarre ?',
    `<p>Souhaitez vous vraiment démarrer la partie ?</p>
<p>Les joueurs pourront alors commencer à répondre aux énigmes.</p>` +
      (!isToday
        ? `<p class="mt-2 font-bold text-red">Attention, il semblerait que cette sortie ne soit pas prévue pour aujourd'hui</p>`
        : ''),
    [
      {
        actionName: 'start',
        title: 'Oui, je lance la partie',
        color: 'green',
      },
      {
        actionName: 'cancel',
        title: 'Non, pas tout de suite',
        color: 'red',
      },
    ],
    'go'
  )
  if (action === 'cancel') return
  startingPending.value = true
  await store.startTrip()
  startingPending.value = false
  countdownRunning.value = true
}
</script>
<template>
  <Page>
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../../assets/img/backgrounds/bg-trip-recap.jpg"
      alt="Background"
    />
    <Back class="absolute z-1 left-7 top-4" />
    <div class="pt-8 relative">
      <h2 class="color-green-dark text-2xl font-black text-center mb-5" mt-0>
        {{ store.trip.name }}
      </h2>
      <div class="text-center mb-3">
        <span class="font-bold">Parcours:</span> {{ store.journey.name }}
      </div>
      <div class="flex items-center color-red justify-center mb-4">
        <div class="i-uil:map-pin-alt mr-2 h-4 text-base"></div>
        <div class="text-left">{{ store.journey.basecampName }}</div>
      </div>
    </div>
    <div class="px-8 relative flex-1 overscroll-contain overflow-scroll">
      <div class="flex flex-col gap-4 py-4">
        <div
          v-for="team in teams"
          :key="team.id"
          class="team-item bg-white py-5 px-6 rounded-xl"
        >
          <header class="flex items-center gap-2 mb-3">
            <TeamAvatar class="w-6 h-6" :team="team" />
            <div class="font-bold">{{ team.name }}</div>
          </header>
          <div>
            <span
              v-for="(member, i) in team.members"
              :key="i"
              class="member-item"
              >{{ member }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="px-10 pb-8">
      <Button
        class="relative w-full mt-6"
        color="green"
        :loading="startingPending"
        @click="startTrip"
      >
        Commencer
      </Button>
    </div>
    <GoCountdown :open="countdownRunning" @end="onCountdownEnd" />
  </Page>
</template>
<style lang="scss" scoped>
.member-item:not(:last-child)::after {
  content: ', ';
}

.team-item {
  box-shadow: 0 1px 3px rgba(0, 35, 30, 0.16);
}
</style>
