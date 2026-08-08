import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { AssignmentItem, AssignmentRow } from "./types";

function getAssignedPublisherName(
  assignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
  assignmentId: string,
): string | undefined {
  if (!assignments) return undefined;
  const assignment = assignments.find((a) => a.assignment_id === assignmentId);
  if (!assignment) return undefined;
  const publisher = publishers?.find((p) => p.id === assignment.participant_id);
  if (!publisher) return undefined;
  return getPublisherDisplayName(publisher);
}

export function useAssignmentRows(
  meetingParts: AssignmentItem[],
  assignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
  week_id: string,
  base_path: string,
): AssignmentRow[] {
  return meetingParts.map((part) => {
    const assignedName =
      part.publisher_override ??
      getAssignedPublisherName(assignments, publishers, part.assignmentId);
    const assistantName = part.assistantId
      ? getAssignedPublisherName(assignments, publishers, part.assistantId)
      : undefined;

    return {
      id: part.assignmentId,
      week_id,
      title: part.title,
      color: part.color,
      publisher: assignedName,
      assistant: assistantName,
      pin_to_first_column: part.pin_to_first_column,
      is_read_only: part.is_read_only,
      base_path,
    };
  });
}
