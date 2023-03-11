import { z } from 'zod'
import { TeamSchema } from './Team'
import { JourneySchema } from './Journey'

export const TripSchema = z.object({
  created: z.string(),
  date: z.string(),
  id: z.string(),
  journey: z.string(),
  updated: z.string(),
  name: z.string(),
  expand: z
    .object({
      teams: z.array(TeamSchema).optional(),
      journey: JourneySchema.optional(),
    })
    .optional(),
})

export type TripType = z.infer<typeof TripSchema>
