<script lang="ts" setup="">
import Page from '~/components/Page.vue'
import Button from '~/components/design-system/Button.vue'
import { useTeamStore } from '~/stores/team/team'
import { useLogout } from '~/composables/useLogout'

const store = useTeamStore()
const logout = useLogout(store.logout)
</script>
<template>
  <Page class="bg-beige-light">
    Ben là il se passe rien de spécial quoi
    <div>
      <Button :to="{ name: 'team-customize' }">Personnaliser l'équipe</Button>
      <Button @click="logout">Déconnexion</Button>
    </div>
  </Page>
</template>
