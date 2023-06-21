<script lang="ts" setup="">
import { useStorage } from '@vueuse/core'
import { onMounted } from 'vue'
import { actionSheetController } from '@ionic/vue'
import { CapacitorShake } from '@capgo/capacitor-shake'
import { useUserStore } from '~/stores/user'
import { useLogout } from '~/composables/useLogout'
import { useTeamStore } from '~/stores/team/team'

const preventGeolocation = useStorage('preventGeolocation', false)

let isOpen = false
const userStore = useUserStore()
const teamStore = useTeamStore()
const presentActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'Dev menu',
    subHeader: `Geolocation is ${
      preventGeolocation.value ? 'disabled' : 'enabled'
    }`,
    buttons: [
      {
        text: preventGeolocation.value
          ? 'Re-enable geolocation'
          : 'Disable geolocation',
        role: preventGeolocation.value ? '' : 'destructive',
        handler: () => {
          preventGeolocation.value = !preventGeolocation.value
        },
      },
      {
        text: 'Logout',
        handler: () => {
          if (userStore.isLoggedIn()) {
            userStore.logout()
          } else {
            teamStore.logout()
          }
          window.location.href = '/'
        },
      },
      {
        text: 'Reload',
        role: 'selected',
        handler: () => {
          window.location.reload()
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
  })
  isOpen = true
  await actionSheet.present()
  isOpen = false
}

const shakesToOpen = 2
let shakeCount = 0
onMounted(() => {
  CapacitorShake.addListener('shake', () => {
    if (isOpen) return
    if (shakeCount < shakesToOpen - 1) {
      shakeCount++
      return
    }
    presentActionSheet()
    shakeCount = 0
  })
})
</script>
<template>
  <div></div>
</template>
