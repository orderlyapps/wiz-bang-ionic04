import { z } from "zod";

export const notAtHomeSchema = z.object({
  id: z.uuid(),
  created_at: z.string(), // timestamp string
  coordinates: z.tuple([z.number(), z.number()]),
  congregation_id: z.uuid(),
  suburb_id: z.uuid(),
  street_id: z.uuid(),
  house_number: z.string().min(1),
  unit_number: z.string().nullable().optional(),
  visit_log: z.array(z.string()), // array of timestamp strings
  write: z.boolean(),
  match_data: z.any(), // jsonb
});

export type NotAtHome = z.infer<typeof notAtHomeSchema>;
