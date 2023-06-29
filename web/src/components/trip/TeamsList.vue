<script lang="ts" setup="">
import { Team as TeamType } from '@journiz/api-types'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

defineProps<{
  teams: TeamType[]
  btnText: string
}>()
const emit = defineEmits(['btn-click'])
</script>
<template>
  <div class="flex flex-col w-full gap-8">
    <div
      class="flex flex-col divide-y divide-white overflow-x-hidden border-b border-white"
    >
      <div
        v-for="team in teams"
        :key="team.id"
        class="flex items-center px-6 py-5 text-green-dark gap-4"
      >
        <span class="font-black">
          {{ team.name }}
        </span>
        <span v-for="(member, i) in team.members" :key="i" class="font-light">
          {{ member }}
        </span>
      </div>
    </div>

    <DefaultButton
      color="secondary"
      class="self-center"
      @click="emit('btn-click')"
    >
      {{ btnText }}
    </DefaultButton>
  </div>
</template>
