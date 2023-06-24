<script lang="ts" setup>
import { ref } from 'vue'

type Step = {
  title: string
  onStep?: () => void
}

// const { data: trip } = useTripForGameMaster()
const steps: Step[] = [
  {
    title: 'Remise à zéro',
    onStep: () => {
      console.log('initial reset')
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
const currentStepIndex = ref(0)
const nextStep = async () => {
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
</script>
<template>
  <div class="bg-amber-50 rounded-lg px-6 py-5">
    <h2 class="font-bold text-xl mb-4">Etapes</h2>
    <div class="flex flex-col gap-2">
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
</template>
