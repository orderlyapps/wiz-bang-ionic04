import { and, eq, gte, inArray, useLiveQuery } from "@tanstack/react-db";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { getMeetingParts } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/get-meeting-parts";
import type { Assignment } from "./useAssignments";

export function useMidweekAssignments(
  congregation_id: string,
  publisher_id: string,
  today_str: string,
): { assignments: Assignment[]; is_loading: boolean } {
  const { data: assignments, isLoading: isLoadingAssignments } = useLiveQuery(
    (q) =>
      congregation_id && publisher_id
        ? q
            .from({ a: midweekAssignmentCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id),
                eq(a.participant_id, publisher_id),
                gte(a.week_id, today_str),
              ),
            )
            .orderBy(({ a }) => a.week_id)
        : undefined,
    [congregation_id, publisher_id, today_str],
  );

  const week_ids = assignments?.map((a) => a.week_id) ?? [];
  const week_ids_key = week_ids.join(",");

  const { data: meetingData, isLoading: isLoadingMeetingData } = useLiveQuery(
    (q) =>
      week_ids.length > 0
        ? q.from({ m: midweekMeetingDataCollection }).where(({ m }) => inArray(m.week_id, week_ids))
        : undefined,
    [week_ids_key],
  );

  const { data: allWeekAssignments, isLoading: isLoadingWeekAssignments } = useLiveQuery(
    (q) =>
      week_ids.length > 0
        ? q
            .from({ a: midweekAssignmentCollection })
            .where(({ a }) =>
              and(eq(a.congregation_id, congregation_id), inArray(a.week_id, week_ids)),
            )
        : undefined,
    [congregation_id, week_ids_key],
  );

  const is_loading =
    isLoadingAssignments ||
    (week_ids.length > 0 && (isLoadingMeetingData || isLoadingWeekAssignments));

  const mapped_assignments =
    assignments?.map((a) => {
      const week_data = meetingData?.find((m) => m.week_id === a.week_id);
      const week_assignments = allWeekAssignments?.filter((x) => x.week_id === a.week_id);
      const show_school_2 =
        week_assignments?.some((x) => x.assignment_id === "chairman_2") ?? false;
      const parts = week_data ? getMeetingParts(week_data, week_assignments, show_school_2) : [];
      const part = parts.find((p) => p.assignmentId === a.assignment_id);
      const fallback = a.assignment_id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const base_label = part?.title ?? fallback;
      const label = a.assignment_id === "chairman_1" ? `${base_label} (Midweek)` : base_label;

      return {
        id: `${a.week_id}-midweek-${a.assignment_id}`,
        type: "midweek" as const,
        week_id: a.week_id,
        label,
      };
    }) ?? [];

  return { assignments: mapped_assignments, is_loading };
}
