import { z } from "zod";

export const outlineSchema = z.object({
  id: z.string(),
  theme: z.string(),
});

export type Outline = z.infer<typeof outlineSchema>;
