import { z } from 'zod'
import { TeamSchema } from './Team'
import { JourneySchema } from './Journey'
import { BaseSchema } from './Base'

export const TripSchema = BaseSchema.extend({
  created: z.string(),
  date: z.string(),
  id: z.string(),
  shortId: z.string(),
  journey: z.string(),
  updated: z.string(),
  name: z.string(),
  duration: z.number(),
  status: z.enum(['pairing', 'playing', 'finishing', 'finished']),
  expand: z
    .object({
      teams: z.array(TeamSchema).optional(),
      journey: JourneySchema.optional(),
    })
    .optional(),
})

export type Trip = z.infer<typeof TripSchema>
