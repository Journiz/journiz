<script lang="ts" setup="">
import { ref, watch } from 'vue'
import Modal from '~/components/modal/Modal.vue'

defineProps<{
  open: boolean
}>()
const emit = defineEmits(['end'])

const player = ref()
const onReady = () => {
  player.value.play()
}
const onCompleted = () => {
  console.log('completed')
  emit('end')
}
</script>
<template>
  <Modal layout="fullscreen" :is-open="open" class="px-0" :no-padding="true">
    <dotlottie-player
      ref="player"
      class="w-full h-full"
      :src="`/lottie/321.lottie`"
      loop="false"
      @ready="onReady"
      @complete="onCompleted"
    />
  </Modal>
</template>
