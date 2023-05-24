import { inject } from 'vue'
import { pageProvideKey } from '~/types/Page'

export default function usePage() {
  return inject(pageProvideKey)
}
