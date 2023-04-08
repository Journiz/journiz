import { useRealtimeConversation } from './useConversation'
import { usePocketBase } from './usePocketBase'

export const useChat = (conversationId: string, sender: 'user' | 'team') => {
  const direction = sender === 'user' ? 'userToTeam' : 'teamToUser'
  const { data: conversation, loading } =
    useRealtimeConversation(conversationId)

  const pb = usePocketBase()
  const sendMessage = async (content: string) => {
    await pb.collection('message').create({
      conversation: conversationId,
      content,
      direction,
    })
  }

  return {
    loading,
    conversation,
    sendMessage,
  }
}
