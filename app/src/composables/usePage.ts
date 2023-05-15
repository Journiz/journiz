import { inject } from 'vue'

export default function usePage() {
  return inject('pageElement')
}
