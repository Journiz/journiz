import OneSignal from 'onesignal-cordova-plugin'
import './capacitorSetup'
import { useEventBus } from '@vueuse/core'
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification'
import router from '~/router'
import { warnOutside, warnTeamOutside } from '~/utils/warnOutside'
import { useTeamStore } from '~/stores/team/team'
import { useUserStore } from '~/stores/user'

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
    try {
      OneSignal.setExternalUserId(id)
    } catch (_) {}
    return
  }
  try {
    OneSignal.removeExternalUserId()
  } catch (e) {
    console.warn('No external id to rmeove')
  }
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
  if (data.event === 'teamOutside') {
    const teamStore = useTeamStore()
    if (teamStore.team) {
      await warnTeamOutside()
    }
  }
  if (data.event === 'userTeamOutside') {
    await warnOutside(data.team, data.teamName)
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
