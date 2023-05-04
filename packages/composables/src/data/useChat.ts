import { useEventListener } from '@vueuse/core'
import { useRealtimeConversation } from './useConversation'
import { usePocketBase } from './usePocketBase'

export const useChat = (conversationId: string, sender: 'user' | 'team') => {
  const {
    data: conversation,
    loading,
    refresh,
  } = useRealtimeConversation(conversationId)

  const pb = usePocketBase()
  const sendMessage = async (content: string) => {
    await pb.collection('message').create({
      conversation: conversationId,
      content,
      sender,
    })
  }
  const markAsRead = async (messageId: string) => {
    await pb.collection('message').update(messageId, {
      read: true,
    })
  }
  useEventListener(document, 'visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      refresh()
    }
  })

  return {
    loading,
    conversation,
    sendMessage,
    markAsRead,
  }
}
