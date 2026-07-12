import { z } from "zod";

export const mapTagAssignmentSchema = z.object({
  id: z.uuid().optional(),
  map_id: z.uuid(),
  tag_id: z.uuid(),
});

export type MapTagAssignmentRow = z.infer<typeof mapTagAssignmentSchema>;
