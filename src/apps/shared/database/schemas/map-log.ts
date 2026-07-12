import { z } from "zod";

export const mapLogSchema = z.object({
  id: z.uuid().optional(),
  map_id: z.uuid(),
  publisher_id: z.uuid(),
  checked_out_at: z.string().nullable().optional(),
  checked_in_at: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type MapLogRow = z.infer<typeof mapLogSchema>;
