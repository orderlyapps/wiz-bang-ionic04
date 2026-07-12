import { z } from "zod";

export const speakerAvailabilitySchema = z.object({
  speaker_id: z.uuid(),
  availability: z.number().int(),
});

export type SpeakerAvailability = z.infer<typeof speakerAvailabilitySchema>;
