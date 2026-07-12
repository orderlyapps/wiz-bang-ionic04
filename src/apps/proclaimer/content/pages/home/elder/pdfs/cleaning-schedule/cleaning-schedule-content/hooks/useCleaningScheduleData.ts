import { and, gte, lte, eq, useLiveQuery } from "@tanstack/react-db";
import { addWeeks, format, parseISO } from "date-fns";
import { cleanMajorCollection } from "@shared/database/collections/clean-major";
import { cleanMinorCollection } from "@shared/database/collections/clean-minor";
import { groupCollection } from "@shared/database/collections/group";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { CleanMajor } from "@shared/database/schemas/clean-major";
import type { CleanMinor } from "@shared/database/schemas/clean-minor";
import type { Group } from "@shared/database/schemas/group";

export type CleaningWeekData = {
  weekId: string;
  weekLabel: string;
  majorGroupName: string | null;
  minorGroupName: string | null;
};

export function useCleaningScheduleData(
  dateRange: { firstMonday: string; lastMonday: string } | null,
): { weeks: CleaningWeekData[]; isLoading: boolean } {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: major_entries } = useLiveQuery(
    (q) =>
      dateRange && congregation_id
        ? q
            .from({ cm: cleanMajorCollection })
            .where(({ cm }) =>
              and(
                eq(cm.congregation_id, congregation_id),
                gte(cm.week_id, dateRange.firstMonday),
                lte(cm.week_id, dateRange.lastMonday),
              ),
            )
        : undefined,
    [congregation_id, dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const { data: minor_entries } = useLiveQuery(
    (q) =>
      dateRange && congregation_id
        ? q
            .from({ cm: cleanMinorCollection })
            .where(({ cm }) =>
              and(
                eq(cm.congregation_id, congregation_id),
                gte(cm.week_id, dateRange.firstMonday),
                lte(cm.week_id, dateRange.lastMonday),
              ),
            )
        : undefined,
    [congregation_id, dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const { data: groups } = useLiveQuery(
    (q) =>
      congregation_id
        ? q.from({ g: groupCollection }).where(({ g }) => eq(g.congregation_id, congregation_id))
        : undefined,
    [congregation_id],
  );

  const isLoading = dateRange
    ? major_entries === undefined || minor_entries === undefined || groups === undefined
    : false;

  const majorMap = new Map(
    ((major_entries as CleanMajor[] | undefined) ?? []).map((e) => [e.week_id, e.group_id]),
  );
  const minorMap = new Map(
    ((minor_entries as CleanMinor[] | undefined) ?? []).map((e) => [e.week_id, e.group_id]),
  );
  const groupMap = new Map<string, string>();
  for (const group of (groups as Group[] | undefined) ?? []) {
    if (group.id) groupMap.set(group.id, group.name);
  }

  const weeks: CleaningWeekData[] = [];
  if (dateRange) {
    let current = parseISO(dateRange.firstMonday);
    const end = parseISO(dateRange.lastMonday);
    while (current <= end) {
      const weekId = format(current, "yyyy-MM-dd");
      const majorGroupId = majorMap.get(weekId);
      const minorGroupId = minorMap.get(weekId);
      weeks.push({
        weekId,
        weekLabel: getTheocraticWeekLabel(weekId, { format: "week-range-capital-case" }),
        majorGroupName: majorGroupId ? (groupMap.get(majorGroupId) ?? null) : null,
        minorGroupName: minorGroupId ? (groupMap.get(minorGroupId) ?? null) : null,
      });
      current = addWeeks(current, 1);
    }
  }

  return { weeks, isLoading };
}
