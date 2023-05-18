<script lang="ts" setup="">
import Button from '~/components/design-system/Button.vue'
import HatPicker from '~/components/team/customize/HatPicker.vue'
import { useTeamStore } from '~/stores/team/team'

const emit = defineEmits(['next'])
const store = useTeamStore()
</script>
<template>
  <div class="flex flex-col text-center">
    <h1 class="text-2xl font-black">
      Que seraient des voyageurs sans couvre-chef ?
    </h1>
    <p class="text-sm">Choisissez un couvre-chef qui vous représente</p>
    <HatPicker v-model="store.team!.hat" class="my-auto" />
    <div class="mt-auto">
      <Button class="w-full" @click="emit('next')">Suivant</Button>
    </div>
  </div>
</template>
