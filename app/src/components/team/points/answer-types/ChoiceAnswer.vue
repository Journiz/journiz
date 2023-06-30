<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { computed, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import Button from '~/components/design-system/Button.vue'
import useTeamAnswer from '~/composables/useTeamAnswer'
import { showModal } from '~/composables/useModal'

const props = defineProps<{
  point: Point
}>()
const answers = computed(() => {
  return (
    props.point.answer as Extract<
      typeof props.point.answer,
      { id?: string; text?: string; isCorrect?: boolean }[]
    >
  ).slice(0, 4)
})
const selectedAnswer = ref<string | null>(null)

const { sendAnswer, loading: validationLoading } = useTeamAnswer(
  props.point,
  true,
  false
)
const answersNum = answers.value.length
const maxAttempts = answersNum > 2 ? 2 : 1
const attempts = useStorage<string[]>('attempts-' + props.point.id, [])
attempts.value = []
const submit = async () => {
  if (!selectedAnswer.value) return
  const isCorrect =
    answers.value.find((answer) => answer.id === selectedAnswer.value)
      ?.isCorrect ?? false
  if (!isCorrect && attempts.value.length < maxAttempts - 1) {
    attempts.value.push(selectedAnswer.value)
    selectedAnswer.value = null
    return
  }
  const penalty = Math.ceil(
    attempts.value.length * (props.point.score / answersNum)
  )
  attempts.value = []
  await sendAnswer(selectedAnswer.value, isCorrect, penalty)
}
watch(
  () => attempts.value.length,
  async (numAttemps) => {
    if (!numAttemps) {
      return
    }
    const remainingAttempts = maxAttempts - numAttemps
    await showModal(
      'Oups! Mauvaise réponse',
      `
    <p>Et non, ce n'est pas ça !</p>
    <p class="font-bold text-theme">Il vous reste ${remainingAttempts} essai${
        remainingAttempts > 1 ? 's' : ''
      }.</p>
    `,
      [
        {
          title: 'Réessayer',
          actionName: 'retry',
          color: 'theme',
        },
      ],
      'wrong'
    )
  }
)
</script>
<template>
  <div class="flex flex-col gap-2">
    <button
      v-for="answer in answers"
      :key="answer.id"
      class="text-left px-6 py-5 rounded-lg shadow btn-animation disabled:opacity-50"
      :class="{
        'bg-green text-white': selectedAnswer === answer.id,
        'bg-white': selectedAnswer !== answer.id,
      }"
      :disabled="attempts.includes(answer.id)"
      @click="selectedAnswer = answer.id"
    >
      {{ answer.text }}
    </button>
    <Button
      color="theme"
      class="mt-4"
      :disabled="!selectedAnswer"
      :loading="validationLoading"
      @click="submit"
      >Valider</Button
    >
  </div>
</template>
