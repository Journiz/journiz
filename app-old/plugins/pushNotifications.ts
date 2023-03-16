import OneSignal from 'onesignal-cordova-plugin'
import { defineNuxtPlugin } from '#app'

// Call this function when your app starts
function oneSignalInit() {
  // Uncomment to set OneSignal device logging to VERBOSE
  // OneSignal.setLogLevel(6, 0);

  OneSignal.setAppId('5124aae4-c3bc-45ae-b35b-f41791fc22c9')

  // Prompts the user for notification permissions.
  OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
    console.log('User accepted notifications: ' + accepted)
  })
  return OneSignal
}

export default defineNuxtPlugin(() => {
  document?.addEventListener('deviceready', () => {
    oneSignalInit().setNotificationOpenedHandler(() => {
      useRouter().push('/')
      useRouter().push('/notif')
    })
  })
})
