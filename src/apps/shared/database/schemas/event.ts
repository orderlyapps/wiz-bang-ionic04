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

export const circuitVisitDetailsSchema = z.object({
  midweek_theme: z.string().default(""),
  weekend_theme: z.string().default(""),
  pioneer_meeting_time: z.string().nullable().default(null), // time string
});

// Only "circuit_visit" has details for now; add other type shapes here as needed.
export const eventDetailsSchema = circuitVisitDetailsSchema;

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
  details: eventDetailsSchema.nullable().default(null),
});

export type CircuitVisitDetails = z.infer<typeof circuitVisitDetailsSchema>;
export type EventDetails = z.infer<typeof eventDetailsSchema>;
export type EventRow = z.infer<typeof eventSchema>;
