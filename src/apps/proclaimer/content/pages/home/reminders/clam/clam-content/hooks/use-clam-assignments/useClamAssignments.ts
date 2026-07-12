import { eq, useLiveQuery } from "@tanstack/react-db";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { MidweekAssignmentId } from "@shared/database/schemas/midweek-assignment";

export type ClamAssignment = {
  assignment_id: MidweekAssignmentId;
  participant: Publisher;
};

export function useClamAssignments(week_id: string) {
  const { data: meeting_data } = useLiveQuery(
    (q) => q.from({ m: midweekMeetingDataCollection }).where(({ m }) => eq(m.week_id, week_id)),
    [week_id],
  );

  const { data: assignment_data } = useLiveQuery(
    (q) =>
      q
        .from({ a: midweekAssignmentCollection })
        .join({ p: publisherCollection }, ({ a, p }) => eq(a.participant_id, p.id))
        .where(({ a }) => eq(a.week_id, week_id))
        .select(({ a, p }) => ({
          assignment_id: a.assignment_id,
          participant: p,
        })),
    [week_id],
  );

  const meeting = (meeting_data as MidweekMeetingData[] | undefined)?.[0];
  const assignments = (assignment_data as ClamAssignment[] | undefined) ?? [];

  const participant = (assignment_id: MidweekAssignmentId) =>
    assignments.find((a) => a.assignment_id === assignment_id)?.participant;

  const has_school_2 = assignments.some((a) => a.assignment_id === "chairman_2");
  const has_school_3 = assignments.some((a) => a.assignment_id === "chairman_3");

  return { meeting, assignments, participant, has_school_2, has_school_3 };
}
