<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { ref } from 'vue'
import Button from '~/components/design-system/Button.vue'
import AudioRecorder from '~/components/audio/AudioRecorder.vue'

const props = defineProps<{
  point: Point
  validationLoading: boolean
}>()
const emit = defineEmits<{
  answer: [data: string]
}>()

const audioData = ref('')
</script>
<template>
  <div class="flex flex-col">
    <AudioRecorder
      v-model="audioData"
      :max-duration="10000"
      class="flex-grow justify-between mt-2 mb-2"
    ></AudioRecorder>
    <Button color="theme" class="mt-4" :loading="validationLoading"
      >Valider</Button
    >
  </div>
</template>
