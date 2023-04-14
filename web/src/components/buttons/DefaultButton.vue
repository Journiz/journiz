<script setup lang="ts">
import { ButtonHTMLAttributes, computed, PropType, ref, toRefs } from 'vue'
// @ts-ignore
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

const { loading, disabled } = toRefs(props)

const actualDisabled = computed(() => {
  return loading.value || disabled.value
})
const hasBeenClicked = ref(false)
</script>
<template>
  <button
    class="btn px-6 py-3 rounded-lg text-white w-fit transition-all flex items-center gap-2"
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
