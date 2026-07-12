import { z } from "zod";

export const groupSchema = z.object({
  id: z.uuid().optional(),
  congregation_id: z.uuid().optional(),
  name: z.string(),
  overseer_id: z.uuid().nullable().optional(),
  assistant_id: z.uuid().nullable().optional(),
});

export type Group = z.infer<typeof groupSchema>;
