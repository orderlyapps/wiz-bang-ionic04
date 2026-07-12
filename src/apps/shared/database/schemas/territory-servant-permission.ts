import { z } from "zod";

export const territoryServantPermissionSchema = z.object({
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  granted_by: z.uuid().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  can_edit: z.boolean(),
});

export type TerritoryServantPermission = z.infer<typeof territoryServantPermissionSchema>;
