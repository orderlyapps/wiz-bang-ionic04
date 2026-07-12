import { z } from "zod";

export const reportPermissionSchema = z.object({
  id: z.uuid().optional(),
  auth_user_id: z.uuid(),
  group_id: z.uuid(),
  can_read: z.boolean(),
  can_edit: z.boolean(),
  granted_by: z.uuid().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type ReportPermission = z.infer<typeof reportPermissionSchema>;
