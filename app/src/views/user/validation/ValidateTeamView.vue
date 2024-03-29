<script lang="ts" setup="">
import { useRoute, useRouter } from 'vue-router'
import { usePocketBase, useRealtimeTeam } from '@journiz/composables'
import { computed, onMounted, ref } from 'vue'
import { until } from '@vueuse/core'
import { useUserStore } from '~/stores/user'
import Header from '~/components/design-system/Header.vue'
import Page from '~/components/Page.vue'
import ValidateQuestionItem from '~/components/user/validate/ValidateQuestionItem.vue'
import useSlideTransition from '~/composables/useSlideTransition'
import Button from '~/components/design-system/Button.vue'
import useGoBack from '~/composables/useGoBack'

const store = useUserStore()
const pb = usePocketBase()
const route = useRoute()
const { data: team } = useRealtimeTeam(route.params.teamId as string)
const answers = computed(() => {
  return (
    team.value?.expand?.answers?.map((answer) => {
      const pointData = store.journey?.expand?.points?.find(
        (pointData) => pointData.id === answer.point
      )
      return {
        ...answer,
        pointData,
      }
    }) ?? []
  )
})
const currentAnswerIndex = ref(0)
const currentAnswer = computed(() => {
  return answers.value[currentAnswerIndex.value]
})
const transitionName = useSlideTransition(currentAnswerIndex)
const isTransitionning = ref(false)

const nextAnswer = () => {
  if (currentAnswerIndex.value === answers.value.length - 1) {
    return
  }
  currentAnswerIndex.value++
}
const previousAnswer = () => {
  if (currentAnswerIndex.value === 0) {
    return
  }
  currentAnswerIndex.value--
}

const updateLoading = ref(false)
const correctAnswer = async (isCorrect: boolean) => {
  updateLoading.value = true
  currentAnswer.value.isCorrect = isCorrect
  currentAnswer.value.hasBeenValidated = true
  const data: any = {
    isCorrect,
    hasBeenValidated: true,
  }
  if (isCorrect && !currentAnswer.value.hasScoreBeenAdded) {
    await pb.collection('team').update(team.value!.id, {
      score: team.value!.score + currentAnswer.value.pointData!.score,
    })
    data.hasScoreBeenAdded = true
  }
  if (!isCorrect && currentAnswer.value.hasScoreBeenAdded) {
    await pb.collection('team').update(team.value!.id, {
      score: team.value!.score - currentAnswer.value.pointData!.score,
    })
    data.hasScoreBeenAdded = false
  }
  await pb.collection('answer').update(currentAnswer.value.id, data)
  updateLoading.value = false
  // await delay(1000)
  // nextAnswer()
}

const allAnswersValidated = computed(() => {
  return answers.value.every((answer) => answer.hasBeenValidated)
})

onMounted(async () => {
  await until(currentAnswer).not.toBe(undefined)
  if (currentAnswer.value.hasBeenValidated) {
    const nextAnswerIndex = answers.value.findIndex(
      (answer) => !answer.hasBeenValidated
    )
    if (nextAnswerIndex > -1) {
      currentAnswerIndex.value = nextAnswerIndex
    }
  }
})

const goBack = useGoBack({ name: 'user-trip-tabs' })
</script>
<template>
  <Page>
    <div v-if="team" class="flex-grow flex h-full flex-col bg-beige-light">
      <Header
        :title="store.trip?.name ?? 'Sortie'"
        subtitle="Validation"
        :back-to="{ name: 'user-trip-tabs' }"
      />
      <div class="py-8 overflow-y-auto overflow-x-hidden flex flex-col gap-6">
        <div v-if="answers[currentAnswerIndex]" class="relative">
          <transition
            :name="transitionName"
            @before-enter="isTransitionning = true"
            @after-enter="isTransitionning = false"
          >
            <div :key="currentAnswer.id" class="px-6">
              <ValidateQuestionItem
                :answer="currentAnswer"
                :update-loading="updateLoading"
                @correct-answer="correctAnswer"
              />
            </div>
          </transition>
        </div>
        <div class="flex justify-between items-center gap-6 px-6">
          <div
            class="transition duration-150"
            :class="
              isTransitionning || currentAnswerIndex === 0 ? 'opacity-0' : ''
            "
          >
            <button
              class="w-12 h-12 grid place-content-center border-2 border-green-dark border-solid rounded-full btn-animation"
              @click="previousAnswer"
            >
              <i class="i-uil:angle-left-b text-24px"></i>
            </button>
          </div>
          <transition mode="out-in">
            <div
              v-if="
                !isTransitionning &&
                currentAnswer?.hasBeenValidated &&
                !currentAnswer?.isCorrect
              "
              class="flex-grow bg-red px-2 py-1 rounded-lg text-center text-xs text-white font-light h-full grid place-content-center transition duration-150 italic"
            >
              L'équipe ne reçoit pas de points
            </div>
            <div
              v-else-if="
                !isTransitionning &&
                currentAnswer?.hasBeenValidated &&
                currentAnswer?.isCorrect
              "
              class="flex-grow bg-green px-2 py-1 rounded-lg text-center text-xs text-white font-light h-full grid place-content-center transition duration-150 italic"
            >
              L'équipe reçoit {{ currentAnswer?.pointData?.score }} points
            </div>
          </transition>
          <div
            class="transition duration-150"
            :class="
              isTransitionning || currentAnswerIndex === answers.length - 1
                ? 'opacity-0'
                : ''
            "
          >
            <button
              class="w-12 h-12 grid place-content-center border-2 border-green-dark border-solid rounded-full btn-animation"
              @click="nextAnswer"
            >
              <i class="i-uil:angle-right-b text-24px"></i>
            </button>
          </div>
        </div>
        <transition>
          <div v-show="allAnswersValidated" class="px-6 flex flex-col gap-4">
            <p class="text-sm font-light italic text-center">
              Cette équipe n'a plus de réponses en attente !
            </p>
            <Button @click="goBack"> Retour aux équipes </Button>
          </div>
        </transition>
      </div>
    </div>
  </Page>
</template>
<style scoped>
.next-step-enter-active,
.prev-step-enter-active {
  @apply absolute top-0 left-0 w-full;
}
</style>
