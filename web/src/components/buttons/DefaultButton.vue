<script setup lang="ts">
import { ButtonHTMLAttributes, PropType, ref } from 'vue'
// @ts-ignore
import { useButtonDisabled } from '@journiz/composables'
import SvgSpinners180Ring from '~icons/svg-spinners/180-ring'
import { ButtonColor, ButtonVariant } from '~/types/Button'

const props = defineProps({
  color: {
    type: String as PropType<ButtonColor>,
    default: 'primary',
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'fill',
  },
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const hasBeenClicked = ref(false)
const { actualDisabled } = useButtonDisabled(props)
</script>
<template>
  <button
    class="btn px-6 py-3 rounded-lg text-white text-center w-fit transition-all flex justify-center items-center gap-2 text-base leading-4"
    cursor="pointer disabled:not-allowed"
    :class="[
      { 'btn-animation': hasBeenClicked },
      `btn-${variant} btn-${color}`,
    ]"
    :disabled="actualDisabled"
    @mousedown="hasBeenClicked = true"
  >
    <SvgSpinners180Ring v-show="loading" />
    <slot />
  </button>
</template>

<style scoped>
.btn {
  box-shadow: 0px 1px 3px rgba(0, 35, 30, 0.16);
}
</style>
