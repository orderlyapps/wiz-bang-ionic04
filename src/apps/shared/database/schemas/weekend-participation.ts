import { z } from "zod";

export const weekendParticipationSchema = z.object({
  participant_id: z.uuid(),
  participation_id: z.string(),
});

export type WeekendParticipation = z.infer<typeof weekendParticipationSchema>;
