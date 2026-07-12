import { z } from "zod";

export const authUserSchema = z.object({
  auth_user_id: z.uuid(),
  created_at: z.string().optional(),
  is_super_admin: z.boolean().optional(),
  created_by: z.uuid().optional(),
});

export type AuthUser = z.infer<typeof authUserSchema>;
