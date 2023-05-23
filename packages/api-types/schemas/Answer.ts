import { z } from 'zod'
import { BaseSchema } from './Base'

export const AnswerSchema = BaseSchema.extend({
  id: z.string(),
  point: z.string(),
  team: z.string(),
  answerData: z.union([z.string(), z.null()]).optional(),
  answerMedia: z.string().optional(),
})
export type Team = z.infer<typeof AnswerSchema>
