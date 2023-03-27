import { z } from 'zod'

export const MessageSchema = z.object({
  id: z.string(),
  attachment: z.string(),
  content: z.string(),
  conversation: z.string(),
  direction: z.enum(['userToTeam', 'teamToUser']),
  read: z.boolean(),
  created: z.string(),
  updated: z.string(),
})
export type Message = z.infer<typeof MessageSchema>
