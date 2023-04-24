import { registerPlugin } from '@capacitor/core'
import type { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation'

export const backgroundGeolocation = registerPlugin(
  'BackgroundGeolocation'
) as BackgroundGeolocationPlugin
