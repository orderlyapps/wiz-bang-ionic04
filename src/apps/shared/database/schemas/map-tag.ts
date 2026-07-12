import { z } from "zod";

export const mapTagSchema = z.object({
  id: z.uuid().optional(),
  congregation_id: z.uuid(),
  name: z.string(),
});

export type MapTagRow = z.infer<typeof mapTagSchema>;
