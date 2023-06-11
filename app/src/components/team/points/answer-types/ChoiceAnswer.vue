<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { computed, ref } from 'vue'
import { em } from 'windicss/types/plugin/typography/utils'
import Button from '~/components/design-system/Button.vue'

const props = defineProps<{
  point: Point
}>()
const emit = defineEmits<{
  answer: [id: string]
}>()
const answers = computed(() => {
  return props.point.answer as Extract<
    typeof props.point.answer,
    { id?: string; text?: string; isCorrect?: boolean }[]
  >
})
const selectedAnswer = ref<string | null>(null)
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
      @click="emit('answer', selectedAnswer)"
      >Valider</Button
    >
  </div>
</template>
