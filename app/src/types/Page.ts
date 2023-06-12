import { ComputedRef, InjectionKey } from 'vue'

export type ProvidedPage = {
  // setBackgroundColor: (color: string) => void
  element: ComputedRef<HTMLElement>
}
export const pageProvideKey = Symbol(
  'provided-page'
) as InjectionKey<ProvidedPage>
