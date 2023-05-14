<script setup lang="ts">
import { ButtonHTMLAttributes, computed, PropType, ref } from 'vue'
import icons from '~/assets/icons'
import { ButtonColor, ButtonVariant } from '~/types/Button'
import useButtonDisabled from '~/composables/useButtonDisabled'
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
  icon: {
    type: String,
    required: true,
    validator(value: string) {
      if (Object.keys(icons).includes(value)) {
        return true
      }
      console.warn(
        '⚠️ The icon name' +
          value +
          "of the props doesn't exist in icons.ts, import or correct string"
      )
      return false
    },
  },
})

const { actualDisabled } = useButtonDisabled(props)

const Icon = computed(() => icons[props.icon])

const hasBeenClicked = ref(false)
</script>

<template>
  <div
    class="btn w-12 h-12 rounded-lg flex items-center justify-center transition-all"
    cursor="pointer disabled:not-allowed"
    :class="[
      { 'btn-animation': hasBeenClicked },
      `btn-${variant} btn-${color}`,
    ]"
    :disabled="actualDisabled"
    @mousedown="hasBeenClicked = true"
  >
    <Icon class="h-6 w-6" />
  </div>
</template>
