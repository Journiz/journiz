import { z } from 'zod'

export const BaseSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
})
