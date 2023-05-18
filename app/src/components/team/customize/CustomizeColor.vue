<script lang="ts" setup="">
import { computed, watch } from 'vue'
import { Team } from '@journiz/api-types'
import { Dialog } from '@capacitor/dialog'
import { useTeamStore } from '~/stores/team/team'
import Button from '~/components/design-system/Button.vue'
import { themeColors } from '~/composables/useThemeColor'

const store = useTeamStore()

const takenColors = computed(
  () =>
    store.trip?.expand?.teams
      ?.filter((team) => team.id !== store.team?.id && team.color)
      .map((team) => team.color) ?? []
)

const updateColor = async (color: Team['color']) => {
  store.team!.color = color
  await store.saveTeam()
}

watch(takenColors, async (newVal) => {
  if (newVal.includes(store.team?.color)) {
    store.team!.color = ''
    await store.saveTeam()
    await Dialog.alert({
      title: 'Oups !',
      message:
        'Vous avez choisi une couleur en même temps qu’une autre équipe. Choisissez-en une autre !',
    })
  }
})
</script>
<template>
  <div class="flex flex-col text-center">
    <div class="my-auto">
      <h1 class="text-2xl font-black">Voyageurs, quelle est votre couleur ?</h1>
      <p class="text-sm">Ahout ! Ahou ! Ahou !</p>
      <div class="grid grid-cols-3 m-8 gap-9">
        <button
          v-for="(hex, name) in themeColors"
          :key="name"
          class="w-full aspect-square rounded-lg relative overflow-hidden"
          :style="{ backgroundColor: hex }"
          :disabled="takenColors.includes(name)"
          @click="updateColor(name)"
        >
          <div
            v-if="store.team?.color && name === store.team?.color"
            class="grid place-content-center text-white"
          >
            <span class="i-uil:check text-32px"></span>
          </div>
          <div
            v-if="name !== store.team?.color && takenColors.includes(name)"
            class="grid place-content-center w-full h-full text-white bg-black/10"
          >
            <span class="i-uil:ban text-28px"></span>
          </div>
        </button>
      </div>
    </div>
    <div class="mt-auto">
      <Button :disabled="!store.team?.color" class="w-full">Suivant</Button>
    </div>
  </div>
</template>
