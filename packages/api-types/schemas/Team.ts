import { z } from "zod";

export const TeamSchema = z.object({
    created: z.string(),
    id: z.string(),
    journey: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    members: z.array(z.string()),
    name: z.string(),
    score: z.number(),
    updated: z.string()
})
export type TeamType = z.infer<typeof TeamSchema>
