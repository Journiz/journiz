<script lang="ts" setup="">
import { toRefs } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()
const { isOpen } = toRefs(props)
const closeModal = () => {
  isOpen.value = false
}
</script>
<template>
  <transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 w-full h-full z-50 flex items-center justify-center px-2 bg-black/30"
    >
      <div
        class="modal-dialog outline-none bg-white rounded-lg w-full px-6 py-6"
      >
        <slot :close-modal="closeModal"></slot>
      </div>
    </div>
  </transition>
</template>
<style lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;

  .modal-dialog {
    @apply transition duration-200 ease-out-quart;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from {
  .modal-dialog {
    transform: scale(0.9);
  }
}
</style>
