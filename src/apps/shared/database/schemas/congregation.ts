import { z } from "zod";

// Congregation relationship logic:
// - Real congregations (those actually using the app) have NO congregation_id (null/undefined)
// - Congregations WITH a congregation_id represent "placeholder" congregations created by a real
//   congregation when they need to reference a congregation that is NOT using the app
// - This allows real congregations to track relationships with external congregations
//   without requiring those congregations to be app users

export const congregationSchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
  congregation_id: z.uuid().nullable().optional(),
  password: z.string().nullable().optional(),
});

export type Congregation = z.infer<typeof congregationSchema>;
