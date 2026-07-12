import type { AvAssignment, AvAssignmentID } from "@shared/database/schemas/av-assignment";
import {
  avAssignmentLabels,
  midweekAVAssignmentIDs,
  midweekAttendantAssignmentIDs,
  weekendAVAssignmentIDs,
  weekendAttendantAssignmentIDs,
} from "@shared/database/schemas/av-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { AvAssignmentGroup } from "./types";

function makeGroup(
  id: string,
  title: string,
  color: string,
  is_header: boolean,
  base_path: string,
  week_id: string,
  assignment_id?: AvAssignmentID,
  publisher?: string,
): AvAssignmentGroup {
  return {
    id,
    title,
    color: color as AvAssignmentGroup["color"],
    is_header,
    assignment_id,
    publisher,
    base_path,
    week_id,
  };
}

export function getAvAssignmentRows(
  week_id: string,
  base_path: string,
  assignments: AvAssignment[],
  publishers: Publisher[],
): AvAssignmentGroup[] {
  const week_assignments = assignments.filter((a) => a.week_id === week_id);

  function getPublisher(assignment_id: AvAssignmentID): string | undefined {
    const a = week_assignments.find((x) => x.assignment_id === assignment_id);
    if (!a) return undefined;
    const pub = publishers.find((p) => p.id === a.participant_id);
    return pub ? getPublisherDisplayName(pub) : undefined;
  }

  const rows: AvAssignmentGroup[] = [
    makeGroup("header_midweek", "Midweek Meeting", "primary", true, base_path, week_id),
    ...midweekAVAssignmentIDs.map((id) =>
      makeGroup(
        id,
        avAssignmentLabels[id],
        "medium",
        false,
        base_path,
        week_id,
        id,
        getPublisher(id),
      ),
    ),
    ...midweekAttendantAssignmentIDs.map((id) =>
      makeGroup(
        id,
        avAssignmentLabels[id],
        "medium",
        false,
        base_path,
        week_id,
        id,
        getPublisher(id),
      ),
    ),
    makeGroup("header_weekend", "Weekend Meeting", "primary", true, base_path, week_id),
    ...weekendAVAssignmentIDs.map((id) =>
      makeGroup(
        id,
        avAssignmentLabels[id],
        "medium",
        false,
        base_path,
        week_id,
        id,
        getPublisher(id),
      ),
    ),
    ...weekendAttendantAssignmentIDs.map((id) =>
      makeGroup(
        id,
        avAssignmentLabels[id],
        "medium",
        false,
        base_path,
        week_id,
        id,
        getPublisher(id),
      ),
    ),
  ];

  return rows;
}
