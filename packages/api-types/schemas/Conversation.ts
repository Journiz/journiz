import { z } from 'zod'
import { MessageSchema } from './Message'

export const ConversationSchema = z.object({
  id: z.string(),
  created: z.string(),
  team: z.string(),
  trip: z.string(),
  updated: z.string(),
  user: z.string(),
  expand: z
    .object({
      messages: z.array(MessageSchema).optional(),
    })
    .optional(),
})

export type Conversation = z.infer<typeof ConversationSchema>
