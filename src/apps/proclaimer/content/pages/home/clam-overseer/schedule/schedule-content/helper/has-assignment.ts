import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";

export function hasAssignment(
  assignments: MidweekAssignment[] | undefined,
  assignmentId: string,
): boolean {
  if (!assignments) return false;
  return assignments.some((a) => a.assignment_id === assignmentId);
}
