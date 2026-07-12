import { z } from "zod";

export const doNotCallSchema = z.object({
  id: z.uuid().optional(),
  created_at: z.string().optional(),
  coordinates: z.array(z.number()),
  congregation_id: z.uuid(),
  suburb_id: z.uuid(),
  street_id: z.uuid(),
  house_number: z.string(),
  unit_number: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  match_data: z.unknown(),
  updated_at: z.string().optional(),
});

export type DoNotCall = z.infer<typeof doNotCallSchema>;
