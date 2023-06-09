<script lang="ts" setup="">
import { useRoute, useRouter } from 'vue-router'
import Page from '~/components/Page.vue'
import Header from '~/components/design-system/Header.vue'
import { useTeamStore } from '~/stores/team/team'
import PointQuestion from '~/components/team/points/PointQuestion.vue'
const store = useTeamStore()
const { pointId } = useRoute().params
const point = store.journey?.expand?.points?.find((p) => p.id === pointId)

const router = useRouter()
if (!point) {
  router.back()
}
</script>
<template>
  <Page>
    <Header
      :back-to="{ name: 'team' }"
      :subtitle="store.team.name"
      :title="point.name"
    />
    <div class="flex-grow col bg-beige-light px-4 py-2">
      <PointQuestion :point="point" />
    </div>
  </Page>
</template>
