import { z } from 'zod'
import { PointSchema } from './Point'
import { BaseSchema } from './Base'

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
  safeZone: z.array(z.array(z.number())).optional(),
  tags: z.array(z.string()),
  updated: z.string(),
  user: z.string(),
  expand: z
    .object({
      points: z.array(PointSchema).optional(),
    })
    .optional(),
})

export type Journey = z.infer<typeof JourneySchema>
