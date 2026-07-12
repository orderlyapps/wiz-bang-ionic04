import { and, gte, lte, eq, useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { eventCollection } from "@shared/database/collections/event";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import {
  avAssignmentLabels,
  midweekAVAssignmentIDs,
  midweekAttendantAssignmentIDs,
  weekendAVAssignmentIDs,
  weekendAttendantAssignmentIDs,
} from "@shared/database/schemas/av-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { EventRow } from "@shared/database/schemas/event";

export type AvWeekData = {
  weekId: string;
  assignments: Map<string, Publisher | undefined>;
  events: { type: string }[];
};

export function useAudioVideoScheduleData(
  dateRange: { firstMonday: string; lastMonday: string } | null,
): {
  weeks: AvWeekData[];
  assignmentLabels: Record<string, string>;
  midweekAVAssignmentIDs: readonly string[];
  midweekAttendantAssignmentIDs: readonly string[];
  weekendAVAssignmentIDs: readonly string[];
  weekendAttendantAssignmentIDs: readonly string[];
  isLoading: boolean;
} {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: assignments } = useLiveQuery(
    (q) =>
      dateRange
        ? q
            .from({ a: avAssignmentCollection })
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

  const { data: events } = useLiveQuery(
    (q) =>
      dateRange
        ? q
            .from({ e: eventCollection })
            .where(({ e }) => eq(e.congregation_id, congregation_id ?? ""))
        : undefined,
    [congregation_id],
  );

  const publisherMap = new Map<string, Publisher>();
  for (const publisher of publishers ?? []) {
    if (publisher.id) publisherMap.set(publisher.id, publisher);
  }

  const assignmentsByWeek = new Map<string, AvAssignment[]>();
  for (const assignment of assignments ?? []) {
    const existing = assignmentsByWeek.get(assignment.week_id) ?? [];
    existing.push(assignment);
    assignmentsByWeek.set(assignment.week_id, existing);
  }

  const weeks: AvWeekData[] = [];
  for (const [weekId, weekAssignments] of assignmentsByWeek) {
    const assignmentMap = new Map<string, Publisher | undefined>();
    for (const assignment of weekAssignments) {
      const publisher = publisherMap.get(assignment.participant_id);
      assignmentMap.set(assignment.assignment_id, publisher);
    }

    const weekEvents = (events ?? [])
      .filter((e) => isEventInWeek(e, weekId))
      .map((e) => ({ type: e.type }));

    weeks.push({
      weekId,
      assignments: assignmentMap,
      events: weekEvents,
    });
  }

  weeks.sort((a, b) => a.weekId.localeCompare(b.weekId));

  const isLoading = dateRange
    ? assignments === undefined || publishers === undefined || events === undefined
    : false;

  return {
    weeks,
    assignmentLabels: avAssignmentLabels,
    midweekAVAssignmentIDs,
    midweekAttendantAssignmentIDs,
    weekendAVAssignmentIDs,
    weekendAttendantAssignmentIDs,
    isLoading,
  };
}

function isEventInWeek(event: EventRow, weekId: string): boolean {
  const [year, month, day] = weekId.split("-").map(Number);
  const weekStart = new Date(year, month - 1, day);
  const weekEnd = new Date(year, month - 1, day + 6);

  const eventDate = new Date(event.start_date);
  return eventDate >= weekStart && eventDate <= weekEnd;
}
