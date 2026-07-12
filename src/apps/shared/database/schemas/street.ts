import { z } from "zod";

export const streetSchema = z.object({
  id: z.uuid().optional(),
  congregation_id: z.uuid(),
  suburb_id: z.uuid(),
  name: z.string(),
  coordinates: z.array(z.number()),
});

export type Street = z.infer<typeof streetSchema>;
