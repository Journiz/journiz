<script setup lang="ts">
import { onMounted } from 'vue'
import type { Message as MessageType } from '@journiz/api-types'

const props = defineProps<{
  message: MessageType
  userType: MessageType['sender']
}>()
const emit = defineEmits(['message-read'])

onMounted(() => {
  if (props.message.sender !== props.userType && !props.message.read) {
    emit('message-read')
  }
})
</script>

<template>
  <div
    ref="el"
    class="bubble rounded-xl p-4 text-white my-2.5 mx-5 whitespace-pre-wrap"
    :class="message.sender === userType ? 'bg-blue-500 ml-auto' : 'bg-blue-400'"
  >
    {{ message.content }}
  </div>
</template>

<style>
.bubble {
  max-width: 69.7%;
}
</style>
