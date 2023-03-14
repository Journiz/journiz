import { registerPlugin } from '@capacitor/core'
import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation'

export default defineNuxtPlugin((nuxt) => {
  // Geolocation plugin
  const BackgroundGeolocation = registerPlugin(
    'BackgroundGeolocation'
  ) as BackgroundGeolocationPlugin
  nuxt.provide('geolocation', BackgroundGeolocation)
})
