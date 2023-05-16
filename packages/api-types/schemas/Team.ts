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
  color: z
    .enum([
      'green',
      'yellow',
      'pink',
      'black',
      'orange',
      'red',
      'purple',
      'skyblue',
      'blue',
      'brown',
      'gray',
      '',
    ])
    .optional(),
})
export type Team = z.infer<typeof TeamSchema>
