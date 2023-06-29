<script lang="ts" setup>
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { usePocketBase, useTripForGameMaster } from '@journiz/composables'
import { initialTeams, teamsNames, teamsScores } from '@/data'

type Step = {
  title: string
  onStep?: () => void
}
const props = defineProps<{
  tripId: string
}>()
const { data: trip, update: updateTrip } = useTripForGameMaster(props.tripId)
const teams = useStorage('teams', [])
const teamId = useStorage('teamId', '')

const pb = usePocketBase()
const steps: Step[] = [
  {
    title: 'Remise à zéro',
    onStep: async () => {
      if (!trip.value) return
      teams.value = []
      teamId.value = ''
      const teamsToDelete = await pb.collection('team').getFullList({
        filter: `trip="${props.tripId}"`,
      })
      for (const team of teamsToDelete) {
        await pb.collection('team').delete(team.id)
      }

      const messagesToDelete = await pb.collection('message').getFullList({
        filter: `conversation.trip="${props.tripId}"`,
      })
      for (const message of messagesToDelete) {
        await pb.collection('message').delete(message.id)
      }

      // Reset trip
      trip.value.status = 'pairing'
      trip.value.date = new Date().toISOString()
      trip.value.duration = 60
      await updateTrip()

      // Create empty teams
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
    title: "Changement des noms d'équipes et init GPS",
    onStep: async () => {
      for (const i in teams.value) {
        await pb.collection('team').update(teams.value[i].id, {
          name: teamsNames[i as unknown as number],
        })
      }
      const teamsIds = teams.value.map((t) => t.id)
      const allTeams = await pb.collection('team').getFullList({
        filter: `trip="${props.tripId}"`,
      })
      teamId.value = allTeams.find((t: any) => !teamsIds.includes(t.id))?.id

      await pb.collection('team').update(teamId.value, {
        latitude: 45.90052,
        longitude: 6.12846,
      })
    },
  },
  {
    title: 'Lancement du parcours',
  },
  {
    title: 'Equipe commence à bouger',
    onStep: async () => {
      await pb.collection('team').update(teamId.value, {
        latitude: 45.90053,
        longitude: 6.12847,
      })
    },
  },
  {
    title: 'Equipe sur le chemin du chateau',
    onStep: async () => {
      console.log('Equipe sur le chemin du chateau')
      await pb.collection('team').update(teamId.value, {
        latitude: 45.897975,
        longitude: 6.1257381,
      })
    },
  },
  {
    title: 'Equipe au chateau',
    onStep: async () => {
      await pb.collection('team').update(teamId.value, {
        latitude: 45.89744297303581,
        longitude: 6.125343084134848,
      })
    },
  },
  {
    title: 'Réponse QCM',
  },
  {
    title: 'Equipe à Bonlieu',
    onStep: async () => {
      console.log('Equipe à Bonlieu')
      await pb.collection('team').update(teamId.value, {
        latitude: 45.90165,
        longitude: 6.12753,
      })
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
    onStep: async () => {
      console.log('Equipe rue Filaterie')
      await pb.collection('team').update(teamId.value, {
        latitude: 45.89921829763893,
        longitude: 6.126424635622585,
      })
    },
  },
  {
    title: 'Enregistrement dialogue',
  },
  {
    title: 'Equipe derrière eglise St mau',
    onStep: async () => {
      console.log('Equipe derrière eglise St mau')
      await pb.collection('team').update(teamId.value, {
        latitude: 45.89861202698144,
        longitude: 6.128718020022944,
      })
    },
  },
  {
    title: 'Indice',
  },
  {
    title: 'Equipe à pont perrière',
    onStep: async () => {
      console.log('Equipe à pont perrière')
      await pb.collection('team').update(teamId.value, {
        latitude: 45.89852540598385,
        longitude: 6.127822651709568,
      })
    },
  },
  {
    title: 'Réponse geoloc',
  },
  {
    title: 'Fin de chrono',
    onStep: async () => {
      console.log('Fin de chrono')
      trip.value.status = 'finishing'
      await updateTrip()
    },
  },
  {
    title: 'Equipes au Paquier',
    onStep: async () => {
      console.log('Equipes au Paquier')
      await pb.collection('team').update(teamId.value, {
        latitude: 45.90052,
        longitude: 6.12846,
      })
      for (const i in teams.value) {
        const data: any = {}
        if (teams[i as unknown as number]?.id) {
          data.latitude = teams[i as unknown as number]?.latitude
          data.longitude = teams[i as unknown as number]?.longitude
        }
        await pb.collection('team').update(teams.value[i].id, data)
      }
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
    onStep: async () => {
      console.log('Auto validation des autres équipes')
      for (const i in teams.value) {
        await pb.collection('team').update(teams.value[i].id, {
          score: teamsScores[i as unknown as number],
        })
      }
    },
  },
  {
    title: 'Prof affiche classement',
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
const runCurrent = () => {
  steps[currentStepIndex.value]?.onStep?.()
}
</script>
<template>
  <div class="bg-amber-50 rounded-lg px-6 py-5">
    <h2 class="font-bold text-xl mb-4">Etapes</h2>
    <div class="flex flex-col gap-2">
      <header class="flex gap-2 items-center">
        <button class="btn btn-primary" @click="reset">Reset</button>
        <button class="btn btn-secondary" @click="runCurrent">
          Run current
        </button>
        <button
          class="btn"
          :disabled="currentStepIndex >= steps.length - 1"
          @click="nextStep()"
        >
          <span class="i-uil:angle-right-b"></span>
        </button>
        <transition>
          <span
            v-show="isRunning"
            class="loading loading-dots loading-md ml-2 text-red"
          ></span>
        </transition>
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
