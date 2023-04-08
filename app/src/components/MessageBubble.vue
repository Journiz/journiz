<script setup lang="ts">
import {Message} from '@journiz/api-types'

// TODO change userType String to good type
const props = defineProps<{message: Message, userType: String}>()

</script>

<template>
  <div class="bubble rounded-xl p-4 text-white my-2.5 mx-5" :class="message.direction.slice(0, 4) === userType ? 'bg-blue-500 ml-auto' : 'bg-blue-400' ">
    {{ message.content }}
  </div>
</template>

<style>
.bubble {
  max-width: 69.7%;
}
</style>