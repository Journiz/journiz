<script setup lang="ts">
import { ButtonHTMLAttributes, computed, PropType } from 'vue'
import { useButtonDisabled } from '@journiz/composables'
import { RouteLocationRaw, RouterLink } from 'vue-router'
import { ButtonColor, ButtonVariant } from '~/types/Button'

const props = defineProps({
  color: {
    type: String as PropType<ButtonColor>,
    default: 'violet',
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
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    required: false,
    default: null,
  },
})

const { actualDisabled } = useButtonDisabled(props)
const component = computed(() => {
  if (props.to) {
    return 'router-link'
  }
  return 'button'
})
</script>
<template>
  <component
    :is="component"
    class="btn px-6 py-3 rounded-lg text-white text-center flex items-center justify-center gap-2 font-medium text-white text-lg text-center"
    cursor="pointer disabled:not-allowed"
    :disabled="actualDisabled"
    :class="[`btn-${variant} btn-${color}`]"
    :type="type"
    :to="to"
  >
    <div v-show="loading" class="i-svg-spinners:180-ring"></div>
    <slot />
  </component>
</template>
<style scoped lang="scss">
.btn {
  border: solid 1px transparent;
  --disabled-color: theme('colors.gray.300');
  --disabled-text: theme('colors.gray.100');

  // Colors
  &-theme {
    --color: theme('colors.theme.DEFAULT');
  }

  &-blue {
    --color: theme('colors.blue');
  }

  &-green {
    --color: theme('colors.green.DEFAULT');
  }

  &-red {
    --color: theme('colors.red');
  }

  &-yellow {
    --color: theme('colors.yellow');
  }

  &-violet {
    --color: theme('colors.violet');
  }

  // Variants
  &-fill {
    background-color: var(--color);
    border-color: var(--color);
    color: white;

    &:disabled {
      background-color: var(--disabled-color);
      border-color: var(--disabled-color);
      color: var(--disabled-text);
    }
  }

  &-outline {
    border: solid var(--color) 1px;
    color: var(--color);

    &:hover {
      background-color: var(--color);
      color: white;
    }

    &:disabled {
      background-color: var(--disabled-color);
      color: var(--disabled-text);
      border-color: var(--disabled-color);
    }
  }

  // Animation
  $baseTransition: background-color 0.2s;
  transition: $baseTransition, transform 0.25s cubic-bezier(0.74, 2.32, 0.58, 1);
  &:active:not(:disabled) {
    animation: none;
    transition: $baseTransition, transform 0.07s ease-in;
    transform: scale(0.95);
    opacity: 0.96;
  }
}
</style>
