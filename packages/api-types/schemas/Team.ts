import { z } from 'zod'
import { BaseSchema } from './Base'
import { AnswerSchema } from './Answer'

export const TeamSchema = BaseSchema.extend({
  created: z.string(),
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  members: z.array(z.string()),
  name: z.string(),
  score: z.number(),
  updated: z.string(),
  color: z
    .enum([
      'green',
      'yellow',
      'pink',
      'black',
      'orange',
      'red',
      'purple',
      'skyblue',
      'brown',
      'violet',
      'blue',
      'teal',
      '',
    ])
    .optional(),
  hat: z.enum([
    'crown',
    'headset',
    'party',
    'cap',
    'sunhat',
    'degree',
    'cook',
    'propeller',
    'bonnet',
  ]),
  warCry: z.string().optional(),
  expand: z
    .object({
      answers: z.array(AnswerSchema).optional(),
    })
    .optional(),
})
export type Team = z.infer<typeof TeamSchema>
