import { z } from 'zod'
import { BaseSchema } from './Base'

export const MessageSchema = BaseSchema.extend({
  id: z.string(),
  attachment: z.string(),
  content: z.string(),
  conversation: z.string(),
  sender: z.enum(['user', 'team']),
  read: z.boolean(),
  created: z.string(),
  updated: z.string(),
})
export type Message = z.infer<typeof MessageSchema>
