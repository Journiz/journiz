import { Ref, watch } from 'vue'

export function waitForEndLoading(loading: Ref<boolean>) {
  return new Promise<void>((resolve) => {
    if (!loading.value) {
      resolve()
    }
    const unWatch = watch(loading, (val) => {
      if (!val) {
        unWatch()
        resolve()
      }
    })
  })
}
