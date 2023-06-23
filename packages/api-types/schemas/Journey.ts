import { z } from 'zod'
import { PointSchema } from './Point'
import { BaseSchema } from './Base'
import { TripSchema } from './Trip'

export const JourneySchema = BaseSchema.extend({
  basecampLatitude: z.number(),
  basecampLongitude: z.number(),
  basecampName: z.string(),
  created: z.string(),
  duration: z.number(),
  id: z.string(),
  indoor: z.boolean(),
  name: z.string(),
  points: z.array(z.string()),
  hasSafeZone: z.boolean().optional(),
  safeZone: z.array(z.array(z.number())).optional(),
  tags: z.array(z.string()),
  updated: z.string(),
  user: z.string(),
  expand: z
    .object({
      points: z.array(PointSchema).optional(),
      trips: z.array(TripSchema).optional(),
    })
    .optional(),
})

export type Journey = z.infer<typeof JourneySchema>
