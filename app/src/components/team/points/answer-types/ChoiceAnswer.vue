<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { computed, ref } from 'vue'
import Button from '~/components/design-system/Button.vue'
import useTeamAnswer from '~/composables/useTeamAnswer'

const props = defineProps<{
  point: Point
}>()
const answers = computed(() => {
  return props.point.answer as Extract<
    typeof props.point.answer,
    { id?: string; text?: string; isCorrect?: boolean }[]
  >
})
const selectedAnswer = ref<string | null>(null)

const { sendAnswer, loading: validationLoading } = useTeamAnswer(
  props.point,
  true,
  false
)
const submit = async () => {
  if (!selectedAnswer.value) return
  const isCorrect =
    answers.value.find((answer) => answer.id === selectedAnswer.value)
      ?.isCorrect ?? false
  await sendAnswer(selectedAnswer.value, isCorrect)
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <button
      v-for="answer in answers"
      :key="answer.id"
      class="text-left px-6 py-5 rounded-lg shadow btn-animation"
      :class="{
        'bg-green text-white': selectedAnswer === answer.id,
        'bg-white': selectedAnswer !== answer.id,
      }"
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
