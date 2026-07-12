import { z } from "zod";

export const cleanMinorSchema = z.object({
  week_id: z.string(),
  congregation_id: z.uuid(),
  group_id: z.uuid(),
});

export type CleanMinor = z.infer<typeof cleanMinorSchema>;
