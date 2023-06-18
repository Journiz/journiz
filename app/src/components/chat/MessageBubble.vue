<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { Message as MessageType } from '@journiz/api-types'
import { usePocketBase } from '@journiz/composables'
import Lightbox from '~/components/design-system/Lightbox.vue'

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

const pb = usePocketBase()
const attachment = computed(() => {
  if (props.message.attachment) {
    return pb.getFileUrl(props.message, props.message.attachment)
  }
  return null
})
</script>

<template>
  <div
    class="flex flex-col my-2.5 mx-5 max-w-69.7% relative"
    :class="message.sender === userType ? 'ml-auto' : ''"
  >
    <div
      class="absolute -bottom-3 w-2 h-2 rounded-full"
      :class="
        message.sender === userType ? 'bg-theme -right-2' : 'bg-green -left-2'
      "
    ></div>
    <div
      class="rounded-lg p-4 text-white whitespace-pre-wrap relative"
      :class="message.sender === userType ? 'bg-theme' : 'bg-green'"
    >
      <span>
        {{ message.content }}
      </span>
      <div v-if="message.sender === userType" class="absolute bottom-1 right-1">
        <div
          class="text-3"
          :class="message.read ? 'i-uil:check-circle' : 'i-uil-circle'"
        ></div>
      </div>
    </div>
    <div v-if="attachment" class="mt-2">
      <Lightbox
        v-slot="{ isOpen }"
        class="w-3/4"
        :class="message.sender === userType ? 'ml-auto' : ''"
      >
        <img
          :src="attachment"
          alt=""
          class="object-cover w-full aspect-2/3"
          :class="isOpen ? 'rounded-xl' : 'rounded-2xl'"
        />
      </Lightbox>
    </div>
  </div>
</template>

<style>
.bubble {
  max-width: 69.7%;
}
</style>
