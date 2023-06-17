import { z } from 'zod'
import { MessageSchema } from './Message'
import { TeamSchema } from './Team'
import { BaseSchema } from './Base'
import { UserSchema } from './User'

export const ConversationSchema = BaseSchema.extend({
  id: z.string(),
  created: z.string(),
  team: z.string(),
  updated: z.string(),
  user: z.string(),
  expand: z
    .object({
      messages: z.array(MessageSchema).optional(),
      team: TeamSchema.optional(),
      user: UserSchema.optional(),
    })
    .optional(),
})

export type Conversation = z.infer<typeof ConversationSchema>
