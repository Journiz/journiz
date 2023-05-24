import { ComputedRef, InjectionKey } from 'vue'

export type ProvidedPage = {
  // setBackgroundColor: (color: string) => void
  element: ComputedRef<any>
}
export const pageProvideKey = Symbol(
  'provided-page'
) as InjectionKey<ProvidedPage>
