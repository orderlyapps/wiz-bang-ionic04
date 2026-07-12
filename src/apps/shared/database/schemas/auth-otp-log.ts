import { z } from "zod";

export const authOtpLogSchema = z.object({
  id: z.uuid().optional(),
  user_id: z.uuid(),
  email: z.string(),
  otp: z.string(),
  created_at: z.string().optional(),
  used_at: z.string().nullable().optional(),
  sent_by_admin_at: z.string().nullable().optional(),
  sent_by_admin_id: z.uuid().nullable().optional(),
});

export type AuthOtpLog = z.infer<typeof authOtpLogSchema>;
