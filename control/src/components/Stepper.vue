<script lang="ts" setup>
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { usePocketBase, useTripForGameMaster } from '@journiz/composables'
import { initialTeams, teamsNames, teamsPositions, teamsScores } from '@/data'

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

const moveTeamsTo = async (positions: number[][]) => {
  for (const i in teams.value) {
    await pb.collection('team').update(teams.value[i].id, {
      latitude: positions[i as any][0],
      longitude: positions[i as any][1],
    })
  }
}

const steps: Step[] = [
  {
    title: 'Remise à zéro',
    onStep: async () => {
      if (!trip.value) return

      // Reset point message
      await pb.collection('point').update('yrbqbka9349xyje', {
        description: `Bonlieu à Annecy est un lieu prisé des amateurs de culture. Il accueille des spectacles, des expositions et des événements artistiques. Bonlieu est un haut lieu de créativité où l'art prend vie, attirant les passionnés d'arts visuels et de spectacle vivant.`,
      })

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
      await moveTeamsTo(teamsPositions[0])
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
      await moveTeamsTo(teamsPositions[1])
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
      await moveTeamsTo(teamsPositions[2])
    },
  },
  {
    title: 'Enregistrement dialogue',
  },
  {
    title: 'Equipe devant mairie',
    onStep: async () => {
      console.log('Equipe devant la mairie')

      await pb.collection('team').update(teamId.value, {
        latitude: 45.899332344715845,
        longitude: 6.129035165594151,
      })
      await moveTeamsTo(teamsPositions[3])
    },
  },
  {
    title: 'Equipe au mauvais endroit',
    onStep: async () => {
      console.log('Equipe au mauvais endroit')
      await pb.collection('team').update(teamId.value, {
        latitude: 45.898450859698585,
        longitude: 6.129210128716409,
      })
    },
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
        if (teams.value[i]) {
          console.log({
            latitude: initialTeams[i as unknown as number]?.latitude,
            longitude: initialTeams[i as unknown as number]?.longitude,
          })
          await pb.collection('team').update(teams.value[i].id, {
            latitude: initialTeams[i as unknown as number]?.latitude,
            longitude: initialTeams[i as unknown as number]?.longitude,
          })
        }
      }
    },
  },
  {
    title: 'Fake réponses des autres équipes',
    onStep: async () => {
      console.log('Fake réponses des autres équipes')
      for (const i in teams.value) {
        if (teams.value[i]) {
          const answersToCreate = Math.floor(Math.random() * 3) + 1
          const points = [
            'yrbqbka9349xyje',
            'czpb36gh8cj4qij',
            'ww71v8rxqb6zfof',
          ]
          for (let j = 0; j < answersToCreate; j++) {
            await pb.collection('answer').create({
              point: points[j],
              team: teams.value[i].id,
              answerData: 'any',
              hasBeenValidated: false,
              isCorrect: false,
            })
          }
        }
      }
    },
  },
  {
    title: 'Validation Equipe photo et audio',
  },
  {
    title: 'Auto validation des autres équipes',
    onStep: async () => {
      const answers = await pb.collection('answer').getFullList({
        filter: `team.trip="${trip.value?.id}"`,
      })
      for (const answer of answers) {
        await pb.collection('answer').update(answer.id, {
          hasBeenValidated: true,
        })
      }
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
  do {
    currentStepIndex.value++
  } while (!steps[currentStepIndex.value]?.onStep)
  await runCurrent()
}
const goToStep = async (step: number) => {
  if (isRunning.value) return
  currentStepIndex.value = step
  await runCurrent()
}

const reset = () => {
  currentStepIndex.value = 0
  runCurrent()
}
const runCurrent = async () => {
  if (isRunning.value) return
  isRunning.value = true
  await steps[currentStepIndex.value]?.onStep?.()
  isRunning.value = false
}
</script>
<template>
  <div class="card bg-base-100 shadow-xl px-6 py-5">
    <h2 class="font-bold text-xl mb-4">Etapes</h2>
    <div class="flex flex-col gap-2">
      <header class="flex gap-2 items-center sticky top-0 py-2 bg-base-100">
        <div class="join">
          <button class="btn join-item btn-error" @click="reset">
            <span class="i-uil:sync"></span>
            Reset
          </button>
          <button class="btn join-item btn-warning" @click="runCurrent">
            <span class="i-uil:play"></span>
            Run current
          </button>
          <button
            class="btn join-item btn-info"
            :disabled="currentStepIndex >= steps.length - 1"
            @click="nextStep()"
          >
            <span class="i-uil:skip-forward-alt"></span>
            Next
          </button>
        </div>
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
          class="flex items-center justify-start font-normal btn normal-case text-left disabled:cursor-default"
          :class="currentStepIndex === i ? 'btn-primary' : ''"
          :disabled="!step.onStep"
          @click="goToStep(i)"
        >
          <span class="font-bold -mr-1">{{ i }}.</span>
          <span>{{ step.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
