<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { ref } from 'vue'
import Button from '~/components/design-system/Button.vue'
import AudioRecorder from '~/components/audio/AudioRecorder.vue'
import useTeamAnswer from '~/composables/useTeamAnswer'

const props = defineProps<{
  point: Point
}>()
const emit = defineEmits<{
  answer: [data: string]
}>()

const audioData = ref('')
const { sendAnswer, loading: validationLoading } = useTeamAnswer(
  props.point,
  false,
  true
)
const submit = async () => {
  if (!audioData.value) return
  await sendAnswer(audioData.value)
}
</script>
<template>
  <div class="flex flex-col">
    <AudioRecorder
      v-model="audioData"
      :max-duration="10000"
      class="flex-grow justify-between mt-2 mb-2"
    ></AudioRecorder>
    <Button
      color="theme"
      class="mt-4"
      :loading="validationLoading"
      :disabled="!audioData"
      @click="submit"
    >
      Valider
    </Button>
  </div>
</template>
