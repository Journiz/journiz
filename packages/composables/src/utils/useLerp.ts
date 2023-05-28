import { ComputedRef, ref, Ref, watch } from 'vue'

export function useLerp(source: Ref, lerpFactor = 0.1) {
  const target = ref(source.value)
  const lerp = () => {
    if (Math.abs(source.value - target.value) < 0.00000001) {
      target.value = source.value
      return
    }
    target.value += (source.value - target.value) * lerpFactor
    requestAnimationFrame(lerp)
  }
  watch(source, () => {
    requestAnimationFrame(lerp)
  })
  return target
}
