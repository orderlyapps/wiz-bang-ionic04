import { z } from "zod";

export const publisherSchema = z.object({
  id: z.uuid().optional(),
  first_name: z.string(),
  middle_name: z.string().nullable().optional(),
  last_name: z.string(),
  display_name: z.string().nullable().optional(),
  congregation_id: z.uuid(),
  standing: z.enum([
    "elder",
    "ministerial_servant",
    "publisher",
    "unbaptised_publisher",
    "associate",
  ]),
  type: z.enum([
    "publisher",
    "regular_pioneer",
    "special_pioneer",
    "continuous_auxiliary",
    "inactive",
    "speaker",
    "associate",
    "circuit_overseer",
  ]),
  gender: z.enum(["male", "female"]),
  family_id: z.uuid().nullable().optional(),
  group_id: z.uuid().nullable().optional(),
  auth_id: z.uuid().nullable().optional(),
  archived_at: z.string().nullable().optional(),
});

export type Publisher = z.infer<typeof publisherSchema>;
