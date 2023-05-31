import { useIonRouter } from '@ionic/vue'
import { Ref, unref } from 'vue'

export default function useGoBack(defaultTo: Ref<any> | any) {
  const router = useIonRouter()
  return () => {
    if (router.canGoBack()) {
      router.back()
    } else if (unref(defaultTo)) {
      router.navigate(unref(defaultTo), 'back', 'replace')
    }
  }
}
