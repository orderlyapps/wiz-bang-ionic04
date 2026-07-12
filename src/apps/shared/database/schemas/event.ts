import { z } from "zod";

const eventTypes = [
  "circuit_assembly",
  "convention",
  "memorial",
  "other",
  "circuit_visit",
  "special_meeting",
  "campaign",
  "special_talk",
] as const;

export const eventTypeSchema = z.enum(eventTypes);

export const eventSchema = z.object({
  id: z.uuid(),
  congregation_id: z.uuid(),
  name: z.string().default(""),
  description: z.string().default(""),
  address: z.string().default(""),
  coordinates: z.array(z.number()).nullable(),
  all_day: z.boolean(),
  start_date: z.string(), // date string in ISO format
  start_time: z.string().nullable(), // time string
  end_date: z.string().nullable(), // date string in ISO format
  end_time: z.string().nullable(), // time string
  type: eventTypeSchema,
});

export type EventRow = z.infer<typeof eventSchema>;
