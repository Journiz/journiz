<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useIonRouter } from '@ionic/vue'
import Header from '~/components/design-system/Header.vue'
import Page from '~/components/Page.vue'
import { useUserStore } from '~/stores/user'
import TeamAvatar from '~/components/team/TeamAvatar.vue'
import { getColor } from '~/composables/useThemeColor'

const store = useUserStore()
const teamId = useRoute().params.teamId
const team = computed(() =>
  store.trip?.expand?.teams?.find((t) => t.id === teamId)
)
const router = useIonRouter()
if (!team.value) {
  if (router.canGoBack()) router.back()
  else router.replace({ name: 'user-trip-tabs' })
}
</script>
<template>
  <Page class="flex flex-col">
    <Header
      :title="team.name"
      subtitle="Informations de l’équipe"
      :back-to="{ name: 'user-trip-tabs' }"
    />
    <div class="grow bg-beige-light px-6">
      <div class="w-full pt-4">
        <TeamAvatar class="h-20 w-20 mx-auto" :team="team" :border="true" />
      </div>
      <div class="flex items-center justify-center gap-5 mt-3">
        <div
          class="flex items-center justify-center bg-white rounded-full h-8 w-8"
        >
          <div
            class="rounded-full h-3 w-3"
            :style="{ backgroundColor: getColor(team.color as any ?? 'green') }"
          ></div>
        </div>
        <div
          class="custom-shadow bg-white flex items-center p-3 gap-2 border rounded-xl grow-0 w-36"
          :style="{
          borderColor: getColor(team.color as any ?? 'green'),
        }"
        >
          <div class="i-mdi:star-four-points-circle-outline h-4 w-4" />
          <div class="font-bold whitespace-nowrap grow text-center">
            {{ team.score }} points
          </div>
        </div>
      </div>
      <div class="flex bg-red rounded-xl p-4 color-white mt-6 justify-between">
        <div class="flex items-center">
          <span class="i-uil:question text-xl" />
          <span>Enigmes résolues</span>
        </div>
        <div>TODO</div>
      </div>
    </div>
  </Page>
</template>
<style scoped>
.custom-shadow {
  filter: drop-shadow(0px 1px 3px rgba(0, 35, 30, 0.16));
}
</style>
