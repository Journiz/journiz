import { z } from 'zod'

export const basePointSchema = z.object({
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
  created: z.string(),
  updated: z.string(),
})
export type Point = z.infer<typeof basePointSchema> & {
  trigger?: Point
}
export const PointSchema: z.ZodType<Point> = basePointSchema.extend({
  trigger: z.lazy(() => PointSchema).optional(),
})
