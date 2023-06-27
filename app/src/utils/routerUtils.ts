import { RouteLocationRaw } from 'vue-router'
import { UseIonRouterResult } from '@ionic/vue'

export const backWithDefault = (
  router: UseIonRouterResult,
  defaultRoute: RouteLocationRaw
) => {
  if (router.canGoBack()) {
    router.back()
  } else {
    router.replace(defaultRoute)
  }
}
