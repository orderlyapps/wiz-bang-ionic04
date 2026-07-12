import { z } from "zod";

export const mapSchema = z.object({
  id: z.uuid().optional(),
  congregation_id: z.uuid(),
  name: z.string(),
  details: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  boundary: z.array(z.tuple([z.number(), z.number()])).nullable(),
  blocks: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(["face", "block"]),
        coordinates: z.array(z.tuple([z.number(), z.number()])),
      }),
    )
    .nullable(),
});

export type MapRow = z.infer<typeof mapSchema>;
