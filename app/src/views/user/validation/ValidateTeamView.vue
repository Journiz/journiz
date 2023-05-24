<script lang="ts" setup="">
import { useRoute } from 'vue-router'
import { usePocketBase, useRealtimeTeam } from '@journiz/composables'
import { computed, ref } from 'vue'
import { useUserStore } from '~/stores/user'
import Header from '~/components/design-system/Header.vue'
import Page from '~/components/Page.vue'
import ValidateQuestionItem from '~/components/user/validate/ValidateQuestionItem.vue'
import useSlideTransition from '~/composables/useSlideTransition'
import { delay } from '~/utils/delay'

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
  await pb.collection('answer').update(currentAnswer.value.id, {
    isCorrect,
    hasBeenValidated: true,
  })
  updateLoading.value = false
  // await delay(1000)
  // nextAnswer()
}

const allAnswersValidated = computed(() => {
  return answers.value.every((answer) => answer.hasBeenValidated)
})

const isTransitionning = ref(false)
</script>
<template>
  <Page>
    <div v-if="team" class="flex-grow h-full flex flex-col bg-beige-light">
      <Header
        :title="store.trip.name"
        subtitle="Validation"
        :back-to="{ name: 'user-trip-tabs' }"
      />
      <div
        class="py-8 overflow-y-auto overflow-x-hidden flex flex-col gap-6 min-h-full"
      >
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
