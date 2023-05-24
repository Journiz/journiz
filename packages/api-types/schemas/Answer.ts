import { z } from 'zod'
import { BaseSchema } from './Base'

export const AnswerSchema = BaseSchema.extend({
  id: z.string(),
  point: z.string(),
  team: z.string(),
  answerData: z.string().optional(),
  answerMedia: z.string().optional(),
  isCorrect: z.boolean(),
  hasBeenValidated: z.boolean(),
})
export type Answer = z.infer<typeof AnswerSchema>
