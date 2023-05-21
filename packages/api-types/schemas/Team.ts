import { z } from 'zod'
import { BaseSchema } from './Base'

export const TeamSchema = BaseSchema.extend({
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
      'brown',
      'violet',
      'blue',
      'gray',
      '',
    ])
    .optional(),
  hat: z.enum(['crown', 'headset', 'party', 'bucket', '']),
  warCry: z.string().optional(),
})
export type Team = z.infer<typeof TeamSchema>
