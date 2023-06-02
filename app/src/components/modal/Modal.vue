<script lang="ts" setup="">
import { onMounted, ref, watch } from 'vue'

const isOpen = ref(true)
const dialog = ref()
const updateOpen = () => {
  if (isOpen.value) {
    dialog.value.showModal()
  } else {
    dialog.value.close()
  }
}
watch(isOpen, updateOpen)
onMounted(() => {
  updateOpen()
})
const closeModal = () => {
  isOpen.value = false
}
</script>
<template>
  <dialog ref="dialog">
    <slot v-if="isOpen" :close-modal="closeModal"></slot>
  </dialog>
</template>
<style scoped lang="scss">
dialog {
  @apply outline-none bg-white rounded-lg w-full px-6 pb-4
    transition duration-400 ease-out-back;
  scale: 0.2;
  opacity: 0;
  &::backdrop {
    @apply bg-black/30;
  }
  &[open] {
    scale: 1;
    opacity: 1;
  }
}
</style>
