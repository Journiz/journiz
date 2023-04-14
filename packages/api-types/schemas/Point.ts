import { z } from 'zod'

export const basePointSchema = z.object({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  question: z.string(),
  media: z.string().optional(),
  answerType: z.enum(['image', 'text', 'choice', 'location']),
  answer: z
    .union([
      z.null(),
      z.string(),
      z.array(z.string()),
      z.object({ lng: z.number(), lat: z.number() }),
    ])
    .optional(),
  score: z.number(),
  created: z.string(),
  updated: z.string(),
  trigger: z.string().optional(),
})
export type Point = z.infer<typeof basePointSchema> & {
  expand?: {
    trigger?: Point
  }
}
export const PointSchema: z.ZodType<Point> = basePointSchema.extend({
  expand: z
    .object({
      trigger: z.lazy(() => PointSchema).optional(),
    })
    .optional(),
})
