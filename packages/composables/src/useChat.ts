import { useRealtimeConversation } from './useConversation'
import { usePocketBase } from './usePocketBase'

export const useChat = (conversationId: string, sender: 'user' | 'team') => {
  const { data: conversation, loading } =
    useRealtimeConversation(conversationId)

  const pb = usePocketBase()
  const sendMessage = async (content: string) => {
    await pb.collection('message').create({
      conversation: conversationId,
      content,
      sender,
    })
  }

  return {
    loading,
    conversation,
    sendMessage,
  }
}
