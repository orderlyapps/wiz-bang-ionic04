import { z } from "zod";

export const reportSchema = z.object({
  confidential_id: z.uuid(),
  congregation_id: z.uuid(),
  group_id: z.uuid().nullable(),
  date: z.string(), // date string
  active: z.boolean(),
  hours: z.number().nullable(),
  bible_studies: z.number().nullable(),
  credit_hours: z
    .object({ ldc: z.number(), bethel: z.number(), hlc: z.number() })
    .partial()
    .nullable(),
  comments: z.string().nullable(),
});

export type Report = z.infer<typeof reportSchema>;
