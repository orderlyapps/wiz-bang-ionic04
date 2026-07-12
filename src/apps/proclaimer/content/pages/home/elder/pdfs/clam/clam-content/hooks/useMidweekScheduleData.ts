import { and, gte, lte, eq, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";

export type WeekScheduleData = {
  weekId: string;
  meetingData: MidweekMeetingData;
  assignments: Map<string, Publisher | undefined>;
};

export function useMidweekScheduleData(
  dateRange: { firstMonday: string; lastMonday: string } | null,
): {
  weeks: WeekScheduleData[];
  isLoading: boolean;
} {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: meetingData } = useLiveQuery(
    (q) =>
      dateRange
        ? q
            .from({ m: midweekMeetingDataCollection })
            .where(({ m }) =>
              and(gte(m.week_id, dateRange.firstMonday), lte(m.week_id, dateRange.lastMonday)),
            )
        : undefined,
    [dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const { data: assignments } = useLiveQuery(
    (q) =>
      dateRange
        ? q
            .from({ a: midweekAssignmentCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id ?? ""),
                gte(a.week_id, dateRange.firstMonday),
                lte(a.week_id, dateRange.lastMonday),
              ),
            )
        : undefined,
    [congregation_id, dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const publisherMap = new Map<string, Publisher>();
  for (const publisher of publishers ?? []) {
    if (publisher.id) publisherMap.set(publisher.id, publisher);
  }

  const assignmentsByWeek = new Map<string, MidweekAssignment[]>();
  for (const assignment of assignments ?? []) {
    const existing = assignmentsByWeek.get(assignment.week_id) ?? [];
    existing.push(assignment);
    assignmentsByWeek.set(assignment.week_id, existing);
  }

  const weeks: WeekScheduleData[] = [];
  for (const meeting of meetingData ?? []) {
    const weekAssignments = assignmentsByWeek.get(meeting.week_id) ?? [];
    const assignmentMap = new Map<string, Publisher | undefined>();

    for (const assignment of weekAssignments) {
      const publisher = publisherMap.get(assignment.participant_id);
      assignmentMap.set(assignment.assignment_id, publisher);
    }

    weeks.push({
      weekId: meeting.week_id,
      meetingData: meeting,
      assignments: assignmentMap,
    });
  }

  weeks.sort((a, b) => a.weekId.localeCompare(b.weekId));

  const isLoading = dateRange
    ? meetingData === undefined || assignments === undefined || publishers === undefined
    : false;

  return { weeks, isLoading };
}
