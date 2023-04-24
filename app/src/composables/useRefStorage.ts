import { onUnmounted, Ref, watch } from 'vue'

export default function (ref: Ref<any>, key: string) {
  const existingValue = localStorage.getItem(key)
  if (existingValue) {
    ref.value = JSON.parse(existingValue)
  }

  const unWatch = watch(
    ref,
    (newVal) => {
      if (newVal) {
        localStorage.setItem(key, JSON.stringify(newVal))
      } else {
        localStorage.removeItem(key)
      }
    },
    {
      deep: true,
    }
  )

  onUnmounted(unWatch)
}
