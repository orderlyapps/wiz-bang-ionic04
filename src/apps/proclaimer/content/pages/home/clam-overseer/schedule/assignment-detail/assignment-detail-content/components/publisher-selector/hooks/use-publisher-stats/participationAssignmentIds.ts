import type { MidweekAssignmentId } from "@shared/database/schemas/midweek-assignment";
import type { ParticipationType } from "../../utils/participationTypeMap";
import { participationTypeMap } from "../../utils/participationTypeMap";

export const participationAssignmentIds: Record<ParticipationType, MidweekAssignmentId[]> = (() => {
  const result: Partial<Record<ParticipationType, MidweekAssignmentId[]>> = {};
  for (const [assignment_id, type] of Object.entries(participationTypeMap) as [
    MidweekAssignmentId,
    ParticipationType,
  ][]) {
    if (!result[type]) result[type] = [];
    result[type]!.push(assignment_id);
  }
  return result as Record<ParticipationType, MidweekAssignmentId[]>;
})();
