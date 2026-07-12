import { z } from "zod";

export const speakerAssignmentSchema = z.object({
  week_id: z.string(),
  speaker_id: z.uuid(),
  congregation_id: z.uuid(),
  outline_id: z.string().nullable().optional(),
});

export type SpeakerAssignment = z.infer<typeof speakerAssignmentSchema>;
