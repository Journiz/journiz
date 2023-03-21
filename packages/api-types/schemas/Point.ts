import { z } from 'zod'

export const PointSchema = z.object({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  question: z.string(),
  answerType: z.enum(['image', 'text', 'choice', 'location']),
  answer: z
    .union([
      z.array(z.string()),
      z.object({ lng: z.number(), lat: z.number() }),
    ])
    .optional(),
  score: z.number(),
  trigger: z.lazy(() => PointSchema).optional(),
  created: z.string(),
  updated: z.string(),
})
