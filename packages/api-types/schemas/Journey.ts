import { z } from "zod";

export const Journey = z.object({
    basecampLatitude: z.number(),
    basecampLongitude: z.number(),
    basecampName: z.string(),
    created: z.string(),
    duration: z.number(),
    id: z.string(),
    indoor: z.boolean(),
    name: z.string(),
    points: z.array(z.unknown()),
    safeZone: z.null(),
    tags: z.array(z.string()),
    updated: z.string(),
    user: z.string()
})
export type Journey = z.infer<typeof Journey>
