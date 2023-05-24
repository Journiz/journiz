import { Ref, ref, watch } from 'vue'

export default function useSlideTransition(currentTab: Ref<number>) {
  const transitionName = ref('next-step')
  watch(currentTab, (to: number, from: number) => {
    transitionName.value = to > from ? 'next-step' : 'prev-step'
  })
  return transitionName
}
