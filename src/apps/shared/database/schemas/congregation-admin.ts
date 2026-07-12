import { z } from "zod";

export const congregationAdminSchema = z.object({
  id: z.uuid().optional(),
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  created_at: z.string().nullable().optional(),
  created_by: z.uuid().nullable().optional(),
});

export type CongregationAdmin = z.infer<typeof congregationAdminSchema>;
