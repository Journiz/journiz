<script lang="ts" setup="">
import Page from '~/components/Page.vue'
import CreateTeam from '~/components/team/CreateTeam.vue'
import { useTeamStore } from '~/stores/team/team'
import Button from '~/components/design-system/Button.vue'

const store = useTeamStore()

let owner: string
let members: string[]
</script>
<template>
  <Page class="flex-col px-7 max-h-screen overflow-hidden">
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../assets/img/backgrounds/bg-trip-recap.jpg"
      alt="Background"
    />
    <h2
      class="relative color-green-dark text-2xl font-black text-center mb-5 mt-10"
    >
      {{ store.trip.name }}
    </h2>
    <div class="relative text-center mb-7 color-green-dark">
      Entrer les participants du groupe
    </div>
    <CreateTeam
      class="relative flex-grow max-h-full"
      @get-members="(value) => (members = value)"
      @get-owner="(value) => (owner = value)"
    />
    <Button class="relative mb-4">Valider</Button>
    <Button class="relative mb-9" router-link="/join/join-team"
      >Rejoindre une équipe existante</Button
    >
  </Page>
</template>
