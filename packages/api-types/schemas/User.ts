import { z } from 'zod'
import { BaseSchema } from './Base'

export const UserSchema = BaseSchema.extend({
  id: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  email: z.string().optional(),
})

export type User = z.infer<typeof UserSchema>
