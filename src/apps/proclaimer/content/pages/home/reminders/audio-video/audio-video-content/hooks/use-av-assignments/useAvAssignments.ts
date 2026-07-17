import { eq, useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { AvAssignmentID } from "@shared/database/schemas/av-assignment";

export type AvAssignmentWithPublisher = {
  assignment_id: AvAssignmentID;
  participant: Publisher;
};

export function useAvAssignments(week_id: string) {
  const { data: assignment_data } = useLiveQuery(
    (q) =>
      q
        .from({ a: avAssignmentCollection })
        .join({ p: publisherCollection }, ({ a, p }) => eq(a.participant_id, p.id))
        .where(({ a }) => eq(a.week_id, week_id))
        .select(({ a, p }) => ({
          assignment_id: a.assignment_id,
          participant: p,
        })),
    [week_id],
  );

  const assignments = (assignment_data as AvAssignmentWithPublisher[] | undefined) ?? [];

  const participant = (assignment_id: AvAssignmentID) =>
    assignments.find((a) => a.assignment_id === assignment_id)?.participant;

  return { assignments, participant };
}
