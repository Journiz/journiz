import { useIonRouter } from '@ionic/vue'

export function useLogout(logoutFn: () => any) {
  const router = useIonRouter()
  return async () => {
    await logoutFn()
    router.navigate('/home', 'back', 'replace', animation)
  }
}
