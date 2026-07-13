import { z } from "zod";

export const visitLogEntrySchema = z.object({
  id: z.string(),
  visited_at: z.string(),
  notes: z.string(),
});

export const returnVisitSchema = z.object({
  id: z.uuid().optional(),
  created_at: z.string().optional(),
  coordinates: z.array(z.number()),
  congregation_id: z.uuid(),
  suburb_id: z.uuid(),
  street_id: z.uuid(),
  house_number: z.string(),
  unit_number: z.string().nullable().optional(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  notes: z.string(),
  visit_log: z.array(visitLogEntrySchema),
  match_data: z.unknown(),
});

export type VisitLogEntry = z.infer<typeof visitLogEntrySchema>;
export type ReturnVisit = z.infer<typeof returnVisitSchema>;
