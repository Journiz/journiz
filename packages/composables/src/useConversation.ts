import { ConversationSchema } from '@journiz/api-types'
import { makeRecordComposable } from '../utils/makeRecordComposable'
import { makeRealtimeRecordComposable } from '../utils/makeRealtimeRecordComposable'
import { makeListComposable } from '../utils/makeListComposable'

export const useConversations = makeListComposable(
  'conversation',
  ConversationSchema
)

export const useConversation = makeRecordComposable(
  'conversation',
  ConversationSchema,
  'message(conversation)'
)
export const useRealtimeConversation = makeRealtimeRecordComposable(
  'conversation',
  ConversationSchema,
  'message(conversation)',
  {
    'message(conversation)': () => [],
  }
)
