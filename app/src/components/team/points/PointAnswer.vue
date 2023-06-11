<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { type Component, computed } from 'vue'
import ChoiceAnswer from '~/components/team/points/answer-types/ChoiceAnswer.vue'
import TextAnswer from '~/components/team/points/answer-types/TextAnswer.vue'
import PhotoAnswer from '~/components/team/points/answer-types/PhotoAnswer.vue'
import AudioAnswer from '~/components/team/points/answer-types/AudioAnswer.vue'

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
    case 'text':
      return TextAnswer
    case 'image':
      return PhotoAnswer
    case 'audio':
      return AudioAnswer
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
