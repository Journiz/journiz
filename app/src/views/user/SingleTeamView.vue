<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useIonRouter } from '@ionic/vue'
import Header from '~/components/design-system/Header.vue'
import Page from '~/components/Page.vue'
import { useUserStore } from '~/stores/user'
import TeamAvatar from '~/components/team/TeamAvatar.vue'

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
      :title="teamId"
      subtitle="Informations de l’équipe"
      :back-to="{ name: 'user-trip-tabs' }"
    />
    <div class="grow bg-beige-light">
      <div class="w-full pt-4">
        <TeamAvatar class="h-20 w-20 mx-auto" :team="team" :border="true" />
      </div>
    </div>
  </Page>
</template>
