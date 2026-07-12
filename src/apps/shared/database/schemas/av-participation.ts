import { z } from "zod";

export const avParticipationSchema = z.object({
  participant_id: z.uuid(),
  participation_id: z.string(),
});

export type AvParticipation = z.infer<typeof avParticipationSchema>;
