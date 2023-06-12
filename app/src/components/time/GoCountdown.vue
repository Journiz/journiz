<script lang="ts" setup="">
import { computed, ref, watch } from 'vue'
import gsap from 'gsap'
import Modal from '~/components/modal/Modal.vue'

const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits(['end'])

const rawCounter = ref(3.99)
const counter = computed(() => Math.floor(rawCounter.value))
const modalOpen = ref(false)
watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      modalOpen.value = true
      await gsap.to(rawCounter, { value: 0, duration: 4, ease: 'linear' })
      emit('end')
    }
  }
)
</script>
<template>
  <Modal layout="window" :is-open="modalOpen">
    <div>{{ counter > 0 ? counter : 'Go !' }}</div>
  </Modal>
</template>
