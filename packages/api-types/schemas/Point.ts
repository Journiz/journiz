import { z } from 'zod'
import { BaseSchema } from './Base'

export const basePointSchema = BaseSchema.extend({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string().optional(),
  question: z.string().optional(),
  media: z.string().optional(),
  answerType: z.enum(['image', 'text', 'choice', 'location']),
  answer: z
    .union([
      z.string(),
      z.array(
        z.object({ id: z.string(), text: z.string(), isCorrect: z.boolean() })
      ),
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
    dependents?: Point[]
  }
}
export const PointSchema: z.ZodType<Point> = basePointSchema.extend({
  expand: z
    .object({
      trigger: z.lazy(() => PointSchema).optional(),
      dependents: z.lazy(() => z.array(PointSchema)).optional(),
    })
    .optional(),
})
