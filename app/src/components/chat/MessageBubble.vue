<script setup lang="ts">
import { Message as MessageType } from '../../../../packages/api-types'

defineProps<{ message: MessageType; userType: MessageType['sender'] }>()
</script>

<template>
  <div
    class="bubble rounded-xl p-4 text-white my-2.5 mx-5"
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
