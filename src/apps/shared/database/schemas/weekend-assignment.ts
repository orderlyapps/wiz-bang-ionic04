import { z } from "zod";

export const weekendAssignmentIDs = ["chairman", "reader"] as const;

export const weekendAssignmentLabels: Record<string, string> = {
  chairman: "Chairman",
  reader: "Reader",
};

export const weekendAssignmentIDSchema = z.union(weekendAssignmentIDs.map((id) => z.literal(id)));

export type WeekendAssignmentID = z.infer<typeof weekendAssignmentIDSchema>;

export const weekendAssignmentSchema = z.object({
  participant_id: z.uuid(),
  assignment_id: weekendAssignmentIDSchema,
  congregation_id: z.uuid(),
  week_id: z.string(), // date string
});

export type WeekendAssignment = z.infer<typeof weekendAssignmentSchema>;
