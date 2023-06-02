<script lang="ts" setup="">
import { ref } from 'vue'
import Button from '~/components/design-system/Button.vue'
import HatPicker from '~/components/team/customize/HatPicker.vue'
import { useTeamStore } from '~/stores/team/team'

const emit = defineEmits(['next'])
const store = useTeamStore()

const isSaving = ref(false)
const confirm = async () => {
  isSaving.value = true
  await store.saveTeam()
  isSaving.value = false
  emit('next')
}
</script>
<template>
  <div class="flex flex-col text-center">
    <h1 class="text-2xl font-black">
      Que seraient des voyageurs sans couvre-chef ?
    </h1>
    <p class="text-sm">Choisissez un couvre-chef qui vous représente</p>
    <HatPicker v-model="store.team!.hat" class="my-auto" />
    <div class="mt-auto">
      <Button class="w-full" @click="confirm">Suivant</Button>
    </div>
  </div>
</template>
