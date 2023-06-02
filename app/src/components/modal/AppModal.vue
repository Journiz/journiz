<script lang="ts" setup="">
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/design-system/Button.vue'
import RiveAnimation from '~/components/modal/RiveAnimation.vue'
import { useAppModal } from '~/composables/useModal'

const { title, text, isOpen, buttons, animationName, closeWithAction } =
  useAppModal()
</script>
<template>
  <Modal :is-open="isOpen">
    <div class="w-full flex flex-col gap-6">
      <h1 class="text-base font-black m-0 text-center mb-8">{{ title }}</h1>
      <div class="w-full h-48 grid place-content-center">
        <RiveAnimation
          v-if="animationName"
          class="h-full w-full"
          :name="animationName"
        />
      </div>
      <p class="font-light text-sm text-center">{{ text }}</p>
      <div class="flex flex-col w-full gap-2">
        <Button
          v-for="button in buttons"
          :key="button.actionName"
          :color="button.color"
          @click="closeWithAction(button.actionName)"
        >
          {{ button.title }}
        </Button>
      </div>
    </div>
  </Modal>
</template>
