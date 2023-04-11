import OneSignal from 'onesignal-cordova-plugin'
import './capacitorSetup'
import { useEventBus } from '@vueuse/core'
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification'
import router from '~/router'

// Call this function when your app starts
function oneSignalInit() {
  // Uncomment to set OneSignal device logging to VERBOSE
  // OneSignal.setLogLevel(6, 0);

  OneSignal.setAppId('5124aae4-c3bc-45ae-b35b-f41791fc22c9')
  OneSignal.setLocationShared(false)

  // Prompts the user for notification permissions.
  OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
    console.log('User accepted notifications: ' + accepted)
  })
  return OneSignal
}

export function setNotificationsId(id: string | null) {
  if (id) {
    OneSignal.setExternalUserId(id)
    return
  }
  OneSignal.removeExternalUserId()
}

export const notificationsEvents = useEventBus('notifications')
export const chatEvents = useEventBus('chat')

async function handleNotificationAction(
  notification: OSNotification,
  isForeground: boolean
) {
  const data: any = notification.additionalData
  if (!data?.event) return
  if (data.event === 'chatMessage') {
    if (isForeground) {
      chatEvents.emit('newMessage')
    } else {
      const { conversation } = data
      await router.push(`/notification/chat/${conversation}`)
    }
  }
}

export function setupPushNotifications() {
  document.addEventListener('deviceready', () => {
    const oneSignal = oneSignalInit()
    oneSignal.setNotificationOpenedHandler(async (ev) => {
      handleNotificationAction(ev.notification, false)
    })

    // Notifications when app in foreground
    oneSignal.setNotificationWillShowInForegroundHandler((e) => {
      // console.log(e.getNotification())
      handleNotificationAction(e.getNotification(), true)
    })
  })
}
