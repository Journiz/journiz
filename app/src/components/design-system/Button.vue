<script setup lang="ts">
import { ButtonHTMLAttributes, PropType, ref } from 'vue'
// @ts-ignore
import { useButtonDisabled } from '@journiz/composables'
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
})

const hasBeenClicked = ref(false)
const { actualDisabled } = useButtonDisabled(props)
</script>
<template>
  <button
    class="btn px-6 py-3 rounded-lg text-white w-fit transition-all flex items-center gap-2 btn-animation"
    cursor="pointer disabled:not-allowed"
    :disabled="actualDisabled"
    @mousedown="hasBeenClicked = true"
  >
    <!--    <SvgSpinners180Ring v-show="loading" />-->
    <div class="i-"></div>
    <slot />
  </button>
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
}
</style>
