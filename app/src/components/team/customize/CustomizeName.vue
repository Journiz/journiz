<script lang="ts" setup="">
import { ref } from 'vue'
import Button from '~/components/design-system/Button.vue'
import TextInput from '~/components/forms/TextInput.vue'
import { useTeamStore } from '~/stores/team/team'

const emit = defineEmits(['next'])

const store = useTeamStore()

const name = ref(store.team?.name || '')
const isSaving = ref(false)
const confirm = async () => {
  isSaving.value = true
  // store.team!.name = name.value
  // await store.saveTeam()
  isSaving.value = false
  emit('next')
}
</script>
<template>
  <div class="flex flex-col text-center">
    <div class="my-auto">
      <h1 class="text-2xl font-black">Qui va là ?</h1>
      <p class="text-sm">
        Le jeu est sur le point de débuter. Comment s’appelle votre équipe ?
      </p>
      <TextInput v-model="name" class="mt-4" label="Nom de l'équipe" />
    </div>
    <div class="mt-auto">
      <Button class="w-full" :loading="isSaving" @click="confirm"
        >Valider</Button
      >
    </div>
  </div>
</template>
