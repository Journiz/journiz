<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { useTeamStore } from '~/stores/team/team'
import PointLinkItem from '~/components/team/points/PointLinkItem.vue'

const store = useTeamStore()
defineProps<{
  points?: Point[]
}>()
</script>
<template>
  <div
    v-if="store.journey"
    class="flex flex-col bg-beige-light pt-3 px-5 pb-64 overflow-y-scroll h-full w-full"
  >
    <div
      class="relative bg-green-dark flex text-white py-2.5 px-5 rounded-xl flex items-center gap-2 text-sm font-light mb-5"
    >
      <img
        class="absolute w-full h-full top-0 left-0 object-center object-cover"
        src="../../../assets/img/backgrounds/basecamp-bg.png"
        alt="Basecamp background"
      />
      <span class="i-material-symbols:other-houses"></span>
      <span> Point de ralliement : {{ store.journey?.basecampName }} </span>
    </div>
    <div class="col gap-3">
      <PointLinkItem v-for="point in points" :key="point.id" :point="point" />
    </div>
  </div>
</template>
