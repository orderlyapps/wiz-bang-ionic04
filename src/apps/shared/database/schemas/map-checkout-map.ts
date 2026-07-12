import { z } from "zod";

export const mapCheckoutMapSchema = z.object({
  id: z.uuid().optional(),
  map_checkout_publisher_id: z.uuid(),
  map_id: z.uuid(),
});

export type MapCheckoutMapRow = z.infer<typeof mapCheckoutMapSchema>;
