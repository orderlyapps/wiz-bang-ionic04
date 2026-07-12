import { z } from "zod";

export const mapCheckoutPublisherSchema = z.object({
  id: z.uuid().optional(),
  publisher_id: z.uuid(),
  congregation_id: z.uuid(),
  max_maps: z.number().int().min(1).default(1),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type MapCheckoutPublisherRow = z.infer<typeof mapCheckoutPublisherSchema>;
