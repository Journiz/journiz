import { ConversationSchema } from '@journiz/api-types'
import { makeRecordComposable } from '../utils/makeRecordComposable'
import { makeRealtimeRecordComposable } from '../utils/makeRealtimeRecordComposable'

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
