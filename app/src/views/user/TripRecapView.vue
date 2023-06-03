<script setup="">
import { computed } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { useUserStore } from '~/stores/user'
import Page from '~/components/Page.vue'
import Button from '~/components/design-system/Button.vue'
import Back from '~/components/router/Back.vue'
const router = useIonRouter()
const store = useUserStore()
const teams = computed(() => store.trip?.expand?.teams ?? [])
const goToMap = () => {
  router.navigate({ name: 'user-trip-tabs' }, 'forward', 'replace')
}
</script>
<template>
  <Page>
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../assets/img/backgrounds/bg-trip-recap.jpg"
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
      <div class="flex items-center color-red justify-center mb-5">
        <div class="i-uil:map-pin-alt mr-2 h-4 text-base"></div>
        <div class="text-left">{{ store.journey.basecampName }}</div>
      </div>
    </div>
    <div class="px-8 relative flex-1 overscroll-contain overflow-scroll">
      <div class="flex flex-col gap-4">
        <div
          v-for="team in teams"
          class="team-item bg-white py-5 px-6 rounded-xl"
        >
          <div class="font-bold mb-3">{{ team.name }}</div>
          <div>
            <span v-for="member in team.members" class="member-item">{{
              member
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="px-10 pb-8">
      <Button class="relative w-full mt-6" color="green" @click="goToMap"
        >Commencer</Button
      >
    </div>
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
