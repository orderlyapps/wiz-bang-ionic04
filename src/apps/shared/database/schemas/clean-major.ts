import { z } from "zod";

export const cleanMajorSchema = z.object({
  week_id: z.string(),
  congregation_id: z.uuid(),
  group_id: z.uuid(),
});

export type CleanMajor = z.infer<typeof cleanMajorSchema>;
