<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { type Component, computed } from 'vue'
import ChoiceAnswer from '~/components/team/points/answer-types/ChoiceAnswer.vue'

const props = defineProps<{
  point: Point
}>()
const emit = defineEmits<{
  answer: [id: string]
}>()
const answerComponent = computed<Component>(() => {
  switch (props.point.answerType) {
    case 'choice':
      return ChoiceAnswer
    default:
      return null
  }
})
</script>
<template>
  <component
    :is="answerComponent"
    v-if="answerComponent"
    :point="point"
    @answer="emit('answer', $event)"
  ></component>
</template>
