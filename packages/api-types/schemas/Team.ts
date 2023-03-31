import { z } from 'zod'

export const TeamSchema = z.object({
  created: z.string(),
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  members: z.array(z.string()),
  name: z.string(),
  score: z.number(),
  updated: z.string(),
})
export type Team = z.infer<typeof TeamSchema>
