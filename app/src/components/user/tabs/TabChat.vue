<script lang="ts" setup="">
import { IonList } from '@ionic/vue'
import { useConversations } from '@journiz/composables'
import { useEventListener } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import ConversationItem from '~/components/user/chat/ConversationItem.vue'
import { useUserStore } from '~/stores/user'
import Header from '~/components/design-system/Header.vue'
import { useTabBadge } from '~/types/tabs'

const store = useUserStore()
const { data, loading, refresh } = useConversations({
  filter: `trip="${useUserStore().trip?.id}"`,
})
const conversations = computed(() =>
  data.value
    .filter(() => true)
    .sort((c) => {
      if (c.isBroadcast) return -1
      return 0
    })
)
useEventListener(document, 'visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    refresh()
  }
})
const unreads = ref([])
const unreadsNum = computed(() =>
  unreads.value.reduce((acc, cur) => acc + cur, 0)
)
const setTabBadge = useTabBadge()
watch(unreadsNum, (value) => {
  setTabBadge?.(value)
})
</script>
<template>
  <Suspense>
    <div v-if="conversations && !loading" class="col h-full bg-beige-light">
      <Header
        :title="store.trip?.name ?? ''"
        subtitle="Messagerie"
        :not-display-infos="true"
      />
      <div class="col flex-grow overflow-y-scroll pb-28 divide-y divide-beige">
        <ConversationItem
          v-for="(conversation, i) in conversations"
          :key="conversation.id"
          :conversation="conversation.id"
          sender="user"
          @unread="unreads[i] = $event"
        />
      </div>
    </div>
    <template #fallback>Chargement...</template>
  </Suspense>
</template>
