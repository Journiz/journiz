<script lang="ts" setup="">
import { computed, ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import Page from '~/components/Page.vue'
import CreateTeam from '~/components/team/CreateTeam.vue'
import { useTeamStore } from '~/stores/team/team'
import Button from '~/components/design-system/Button.vue'

const store = useTeamStore()

const members = ref<string[]>(['', ''])
const loading = ref(false)
const router = useIonRouter()

const submit = async () => {
  loading.value = true
  await store.createTeam(members.value)
  loading.value = false
  return router.navigate('/team', 'root', 'replace')
}
const canSubmit = computed(() => {
  return members.value.length > 0 && members.value.every((m) => m !== '')
})
</script>
<template>
  <Page class="flex-col px-7 max-h-screen overflow-scroll">
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../assets/img/backgrounds/bg-trip-recap.jpg"
      alt="Background"
    />
    <h2
      class="relative color-green-dark text-2xl font-black text-center mb-5 mt-10"
    >
      {{ store.trip?.name }}
    </h2>
    <div class="relative text-center mb-7 color-green-dark">
      Entrer les participants du groupe
    </div>
    <CreateTeam v-model:members="members" class="relative flex-grow" />
    <Button
      class="relative mb-4"
      :disabled="!canSubmit"
      :loading="loading"
      @click="submit"
    >
      Valider
    </Button>
    <Button class="relative mb-9" to="/join/join-team">
      Rejoindre une équipe existante
    </Button>
  </Page>
</template>
