<script lang="ts" setup="">
import { useTeamStore } from '~/stores/team/team'
import { useLogout } from '~/composables/useLogout'
import Header from '~/components/design-system/Header.vue'
import Button from '~/components/design-system/Button.vue'

const store = useTeamStore()

const logout = useLogout(store.logout)
</script>
<template>
  <div v-if="store.team" class="flex flex-col h-full">
    <Header :subtitle="store.team.name" title="Paramètres" />
    <div class="flex-grow bg-beige-light p-4">
      <div
        class="shadow bg-white rounded-lg p-6 flex flex-col text-green-dark gap-6"
      >
        <span class="text-center text-xl font-black">
          Batterie faible ? <br />
          Autre problème ?
        </span>
        <Button @click="logout">Se déconnecter</Button>
        <div class="flex items-start gap-2">
          <span
            class="i-ion:information-circle flex-shrink-0 text-red text-28px"
          ></span>
          <p class="text-sm font-light italic">
            Le maitre du jeu sera notifé de la déconnexion. Merci de vous
            reconnecter rapidement sur un autre appareil.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
