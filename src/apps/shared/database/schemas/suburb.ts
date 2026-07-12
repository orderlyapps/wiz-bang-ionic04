import { z } from "zod";

export const suburbSchema = z.object({
  id: z.uuid().optional(),
  congregation_id: z.uuid(),
  name: z.string(),
  bbox: z.array(z.number()),
});

export type Suburb = z.infer<typeof suburbSchema>;
