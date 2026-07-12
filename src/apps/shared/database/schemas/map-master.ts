import { z } from "zod";

export const mapMasterSchema = z.object({
  congregation_id: z.uuid(),
  boundary: z.unknown(),
  details: z.string().nullable().optional(),
});

export type MapMaster = z.infer<typeof mapMasterSchema>;
