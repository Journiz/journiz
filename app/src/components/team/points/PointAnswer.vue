<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { type Component, computed, ref } from 'vue'
import ChoiceAnswer from '~/components/team/points/answer-types/ChoiceAnswer.vue'
import TextAnswer from '~/components/team/points/answer-types/TextAnswer.vue'
import PhotoAnswer from '~/components/team/points/answer-types/PhotoAnswer.vue'
import AudioAnswer from '~/components/team/points/answer-types/AudioAnswer.vue'
import PlaceAnswer from '~/components/team/points/answer-types/PlaceAnswer.vue'

const props = defineProps<{
  point: Point
}>()

const answerComponent = computed<Component | null>(() => {
  switch (props.point.answerType) {
    case 'choice':
      return ChoiceAnswer
    case 'text':
      return TextAnswer
    case 'image':
      return PhotoAnswer
    case 'audio':
      return AudioAnswer
    case 'location':
      return PlaceAnswer
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
  ></component>
</template>
