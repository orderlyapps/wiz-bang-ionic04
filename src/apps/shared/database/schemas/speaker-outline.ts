import { z } from "zod";

export const speakerOutlineSchema = z.object({
  speaker_id: z.uuid(),
  outline_id: z.string().optional(),
});

export type SpeakerOutline = z.infer<typeof speakerOutlineSchema>;
