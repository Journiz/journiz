<script setup lang="ts">
import { onMounted } from 'vue'
import type { Message as MessageType } from '@journiz/api-types'
import { IonIcon } from '@ionic/vue'
import { checkmarkCircleOutline, ellipseOutline } from 'ionicons/icons'

const props = defineProps<{
  message: MessageType
  userType: MessageType['sender']
}>()
const emit = defineEmits(['message-read'])

onMounted(() => {
  if (props.message.sender !== props.userType && !props.message.read) {
    if (document.visibilityState === 'visible') {
      emit('message-read')
    }
  }
})
</script>

<template>
  <div
    ref="el"
    class="bubble rounded-xl p-4 text-white my-2.5 mx-5 whitespace-pre-wrap relative"
    :class="message.sender === userType ? 'bg-blue-500 ml-auto' : 'bg-blue-400'"
  >
    <span>
      {{ message.content }}
    </span>
    <div v-if="message.sender === userType" class="absolute bottom-0 right-1">
      <IonIcon :icon="message.read ? checkmarkCircleOutline : ellipseOutline" />
    </div>
  </div>
</template>

<style>
.bubble {
  max-width: 69.7%;
}
</style>
