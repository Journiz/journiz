<script lang="ts" setup="">
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/design-system/Button.vue'
import RiveAnimation from '~/components/modal/RiveAnimation.vue'
import { useAppModal } from '~/composables/useModal'

const {
  title,
  content,
  isOpen,
  layout,
  buttons,
  animationName,
  closeWithAction,
} = useAppModal()
</script>
<template>
  <Modal :is-open="isOpen" :layout="layout">
    <div
      class="w-full flex flex-col gap-6"
      :class="layout === 'fullscreen' ? 'justify-center h-full' : ''"
    >
      <h1
        class="text-base font-black m-0 text-center"
        :class="layout === 'fullscreen' ? '' : 'mb-8'"
      >
        {{ title }}
      </h1>
      <div
        class="h-48 grid place-content-center relative z-1"
        :class="layout === 'fullscreen' ? '-order-1 mt-auto' : 'w-full'"
      >
        <div
          class="absolute left-1/2 top-1/2 aspect-square halo transform -translate-1/2 scale-150"
        ></div>
        <RiveAnimation
          v-if="animationName"
          class="w-full"
          :class="layout === 'fullscreen' ? '' : 'h-full'"
          :name="animationName"
        />
      </div>
      <div
        class="font-light text-sm text-center relative z-2"
        v-html="content"
      ></div>
      <div
        class="flex flex-col w-full gap-2 relative z-2"
        :class="layout === 'fullscreen' ? 'mt-auto' : ''"
      >
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
<style>
.halo {
  background: radial-gradient(
    circle,
    theme('colors.beige.DEFAULT') 25%,
    transparent 70%
  );
}
</style>
