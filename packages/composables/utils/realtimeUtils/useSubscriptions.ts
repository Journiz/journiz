import { onUnmounted } from 'vue'

export const useSubscriptions = () => {
  let unsubscribes: (() => void)[] = []
  const unsubscribeAll = () => {
    unsubscribes.forEach((u) => u())
    unsubscribes = []
  }
  onUnmounted(unsubscribeAll)

  const registerSubscription = (unsubscribe: () => void) => {
    unsubscribes.push(unsubscribe)
  }

  return {
    unsubscribeAll,
    registerSubscription,
  }
}
