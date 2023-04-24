import { z } from 'zod'
import { PointSchema } from './Point'

export const JourneySchema = z.object({
  basecampLatitude: z.number(),
  basecampLongitude: z.number(),
  basecampName: z.string(),
  created: z.string(),
  duration: z.number(),
  id: z.string(),
  indoor: z.boolean(),
  name: z.string(),
  points: z.array(z.string()),
  safeZone: z.null(),
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
