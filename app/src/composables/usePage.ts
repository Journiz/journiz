import { inject, Ref } from 'vue'

export default function usePage(): Ref<HTMLElement> | undefined {
  return inject('pageElement')
}
