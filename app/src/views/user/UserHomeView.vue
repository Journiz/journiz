<script lang="ts" setup="">
import { IonToolbar, useIonRouter } from '@ionic/vue'
import PickTrip from '~/components/user/PickTrip.vue'
import { useLogout } from '~/composables/useLogout'
import { useUserStore } from '~/stores/user'
import Page from '~/components/Page.vue'
import Button from '~/components/design-system/Button.vue'

const router = useIonRouter()
const onTripChange = () => {
  router.navigate({ name: 'user-trip-tabs' }, 'forward', 'replace')
}
const logout = useLogout(useUserStore().logout)
</script>
<template>
  <Page class="relative justify-center h-full">
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../assets/img/backgrounds/bg-journey-choice.jpg"
      alt="Background"
    />
    <div class="-translate-y-3 px-8">
      <h2
        class="relative color-green-dark text-2xl font-black text-center mb-5"
      >
        Parcours
      </h2>
      <div class="text-center mb-8">
        Choisissez le parcours que vous souhaitez rejoindre
      </div>
      <PickTrip @trip-change="onTripChange" />
    </div>
    <Button class="absolute bottom-3 left-8 mt-4" color="theme" @click="logout"
      >Logout</Button
    >
  </Page>
</template>
