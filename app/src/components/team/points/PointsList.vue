<script lang="ts" setup="">
import { useTeamStore } from '~/stores/team/team'

const store = useTeamStore()
</script>
<template>
  <div class="flex flex-col bg-beige h-full pt-3 px-5 pb-32">
    <div
      class="bg-green-dark flex text-white py-2.5 px-5 rounded-xl flex items-center gap-2 text-sm font-light mb-5"
    >
      <span class="i-material-symbols:other-houses"></span>
      <span class="">
        Point de ralliement : {{ store.journey?.basecampName }}</span
      >
    </div>
    <div class="col gap-3">
      <div>Hey</div>
      <div>Hey</div>
    </div>
  </div>
</template>
