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
  const sendMessage = async (content: string, attachment?: Blob) => {
    const data = new FormData()
    data.append('conversation', conversationId)
    data.append('content', content)
    data.append('sender', sender)
    if (attachment) {
      data.append('attachment', attachment)
    }
    await pb.collection('message').create(data)
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
