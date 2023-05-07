<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { Message as MessageType } from '@journiz/api-types'
import { IonIcon } from '@ionic/vue'
import { usePocketBase } from '@journiz/composables'
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

const pb = usePocketBase()
const attachment = computed(() => {
  if (props.message.attachment) {
    return pb.getFileUrl(props.message, props.message.attachment)
  }
})
</script>

<template>
  <div
    class="flex flex-col my-2.5 mx-5 max-w-69.7%"
    :class="message.sender === userType ? 'ml-auto' : ''"
  >
    <div
      class="rounded-xl p-4 text-white whitespace-pre-wrap relative"
      :class="message.sender === userType ? 'bg-indigo-600' : 'bg-indigo-400'"
    >
      <span>
        {{ message.content }}
      </span>
      <div v-if="message.sender === userType" class="absolute bottom-0 right-1">
        <IonIcon
          :icon="message.read ? checkmarkCircleOutline : ellipseOutline"
        />
      </div>
    </div>
    <div v-if="attachment" class="mt-2">
      <img
        :src="attachment"
        alt=""
        class="w-3/4 rounded-lg"
        :class="message.sender === userType ? 'ml-auto' : ''"
      />
    </div>
  </div>
</template>

<style>
.bubble {
  max-width: 69.7%;
}
</style>
