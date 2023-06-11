<script lang="ts" setup="">
import { useRoute, useRouter } from 'vue-router'
import { useIonRouter } from '@ionic/vue'
import Page from '~/components/Page.vue'
import Header from '~/components/design-system/Header.vue'
import { useTeamStore } from '~/stores/team/team'
import PointQuestion from '~/components/team/points/PointQuestion.vue'
import PointAnswer from '~/components/team/points/PointAnswer.vue'
const store = useTeamStore()
const { pointId } = useRoute().params
const point = store.journey?.expand?.points?.find((p) => p.id === pointId)

const router = useIonRouter()
if (
  !point ||
  !!store.team?.expand?.answers?.find((a) => a.point === point.id) // If the team has already answered this point
) {
  if (router.canGoBack()) {
    router.back()
  } else {
    router.replace({ name: 'team' })
  }
}
</script>
<template>
  <Page>
    <Header
      :back-to="{ name: 'team' }"
      :subtitle="store.team.name"
      :title="point.name ?? ''"
    />
    <div
      class="flex-grow flex-shrink col bg-beige-light px-4 pt-4 pb-8 overflow-y-scroll gap-6"
    >
      <PointQuestion :point="point" />
      <PointAnswer :point="point" />
    </div>
  </Page>
</template>
