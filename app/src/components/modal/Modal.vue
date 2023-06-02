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
    <slot :close-modal="closeModal"></slot>
  </dialog>
</template>
<style scoped lang="scss">
dialog {
  @apply outline-none bg-white rounded-lg w-full px-6;
  &::backdrop {
    @apply bg-black/30;
  }
}
</style>
