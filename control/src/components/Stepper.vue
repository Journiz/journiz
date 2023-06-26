<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { usePocketBase, useTripForGameMaster } from '@journiz/composables'
import { initialTeams } from '@/data'

type Step = {
  title: string
  onStep?: () => void
}
const props = defineProps<{
  tripId: string
}>()
const { data: trip } = useTripForGameMaster(props.tripId)
const teams = useStorage('teams', [])
const pb = usePocketBase()
const steps: Step[] = [
  {
    title: 'Remise à zéro',
    onStep: async () => {
      console.log('RESET')
      teams.value = []
      const teamsToDelete = await pb.collection('team').getFullList({
        filter: `trip="${props.tripId}"`,
      })
      for (const team of teamsToDelete) {
        await pb.collection('team').delete(team.id)
      }
      for (const team of initialTeams) {
        const t = await pb.collection('team').create({
          ...team,
          trip: props.tripId,
        })
        teams.value.push(t)
      }
    },
  },
  {
    title: 'Equipe ajoutée à la main',
  },
  {
    title: "Personnalisation de l'équipe",
  },
  {
    title: "Changement des noms d'équipes",
    onStep: () => {
      console.log('teams names')
    },
  },
  {
    title: 'GPS Tout le monde au paquier',
    onStep: () => {
      console.log('GPS Tout le monde au paquier')
    },
  },
  {
    title: 'Lancement du parcours',
  },
  {
    title: 'Equipe sur le chemin du chateau',
    onStep: () => {
      console.log('Equipe sur le chemin du chateau')
    },
  },
  {
    title: 'Equipe au chateau',
    onStep: () => {
      console.log('Equipe au chateau')
    },
  },
  {
    title: 'Réponse QCM',
  },
  {
    title: 'Equipe à Bonlieu',
    onStep: () => {
      console.log('Equipe à Bonlieu')
    },
  },
  {
    title: 'Message de chat',
  },
  {
    title: 'Message à tout le monde porte coté',
  },
  {
    title: 'Prise de photo',
  },
  {
    title: 'Equipe rue Filaterie',
    onStep: () => {
      console.log('Equipe rue Filaterie')
    },
  },
  {
    title: 'Enregistrement dialogue',
  },
  {
    title: 'Equipe derrière eglise St mau',
    onStep: () => {
      console.log('Equipe derrière eglise St mau')
    },
  },
  {
    title: 'Indice',
  },
  {
    title: 'Equipe à pont perrière',
    onStep: () => {
      console.log('Equipe à pont perrière')
    },
  },
  {
    title: 'Réponse geoloc',
  },
  {
    title: 'Fin de chrono',
    onStep: () => {
      console.log('Fin de chrono')
    },
  },
  {
    title: 'Equipes au Paquier',
    onStep: () => {
      console.log('Equipes au Paquier')
    },
  },
  {
    title: 'Fake réponses des autres équipes',
    onStep: () => {
      console.log('Fake réponses des autres équipes')
    },
  },
  {
    title: 'Validation Equipe photo (et audio)',
  },
  {
    title: 'Auto validation des autres équipes',
    onStep: () => {
      console.log('Auto validation des autres équipes')
    },
  },
  {
    title: 'Prof affiche classement',
    onStep: () => {
      console.log('Prof affiche classement')
    },
  },
]
const isRunning = ref(false)
const currentStepIndex = useStorage('currentStepIndex', 0)
const nextStep = async () => {
  if (currentStepIndex.value >= steps.length - 1) return
  isRunning.value = true
  do {
    currentStepIndex.value++
  } while (
    !steps[currentStepIndex.value].onStep &&
    currentStepIndex.value < steps.length - 1
  )
  await steps[currentStepIndex.value].onStep?.()
  isRunning.value = false
}
const goToStep = async (step: number) => {
  if (isRunning.value) return
  if (step < currentStepIndex.value) {
    currentStepIndex.value = 0
    await steps[currentStepIndex.value].onStep?.()
  }
  while (currentStepIndex.value < step) {
    await nextStep()
  }
}

const reset = () => {
  currentStepIndex.value = 0
  steps[0]?.onStep?.()
}
</script>
<template>
  <div class="bg-amber-50 rounded-lg px-6 py-5">
    <h2 class="font-bold text-xl mb-4">Etapes</h2>
    <div class="flex flex-col gap-2">
      <header class="flex gap-2">
        <button class="btn btn-primary self-start" @click="reset">Reset</button>
        <button
          class="btn self-start"
          :disabled="currentStepIndex >= steps.length - 1"
          @click="nextStep()"
        >
          <span class="i-uil:angle-right-b"></span>
        </button>
      </header>
      <div class="flex flex-col gap-2 flex-grow overflow-y-auto">
        <button
          v-for="(step, i) in steps"
          :key="step.title"
          class="flex items-center px-4 py-3 disabled:bg-gray-200 rounded-lg"
          :class="currentStepIndex === i ? 'bg-sky-800 text-white' : 'bg-white'"
          :disabled="!step.onStep"
          @click="goToStep(i)"
        >
          <span class="font-bold mr-1">{{ i }}.</span>
          <span>{{ step.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
