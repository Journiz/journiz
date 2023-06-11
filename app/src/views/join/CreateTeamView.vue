<script lang="ts" setup="">
import Page from '~/components/Page.vue'
import Button from '~/components/design-system/Button.vue'
import CreateTeam from '~/components/team/CreateTeam.vue'
let owner: string
let members: string[]
</script>
<template>
  <Page class="flex-col px-7">
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../assets/img/backgrounds/bg-pin.jpg"
      alt="Background"
    />
    <div>
      <CreateTeam
        class="relative"
        @get-members="(value) => (members = value)"
        @get-owner="(value) => (owner = value)"
      />
      <!-- <Button class="relative" router-link="/join/join-team"
            >Rejoindre une équipe existante</Button
          > -->
    </div>
  </Page>
</template>
