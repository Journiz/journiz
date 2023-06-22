import { z } from 'zod'
import { Team, TeamSchema } from './Team'
import { Journey, JourneySchema } from './Journey'
import { BaseSchema } from './Base'

const baseTripSchema = BaseSchema.extend({
  created: z.string(),
  date: z.string(),
  id: z.string(),
  shortId: z.string(),
  journey: z.string(),
  updated: z.string(),
  name: z.string(),
  duration: z.number(),
  status: z.enum(['pairing', 'playing', 'finishing', 'finished']),
})

export type Trip = z.infer<typeof baseTripSchema> & {
  expand?: {
    teams?: Team[]
    journey?: Journey
  }
}

export const TripSchema: z.ZodType<Trip> = baseTripSchema.extend({
  expand: z.object({
    teams: z.array(TeamSchema).optional(),
    journey: z.lazy(() => JourneySchema).optional(),
  }),
})
