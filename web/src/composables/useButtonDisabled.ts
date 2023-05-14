import { computed, toRefs } from 'vue'

export default function useButtonDisabled(props: {
  disabled: boolean
  loading: boolean
}) {
  const { loading, disabled } = toRefs(props)

  const actualDisabled = computed(() => {
    return loading.value || disabled.value
  })
  return {
    actualDisabled,
  }
}
