import { eq, useLiveQuery } from "@tanstack/react-db";
import { addWeeks, endOfYear, format, parseISO, startOfWeek } from "date-fns";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { cleanMajorCollection } from "@shared/database/collections/clean-major";
import { cleanMinorCollection } from "@shared/database/collections/clean-minor";
import { groupCollection } from "@shared/database/collections/group";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import type { CleanMajor } from "@shared/database/schemas/clean-major";
import type { CleanMinor } from "@shared/database/schemas/clean-minor";
import type { Group } from "@shared/database/schemas/group";

export interface CleaningWeek {
  week_id: string;
  week_label: string;
  major_group_id: string | null;
  minor_group_id: string | null;
}

export interface CleaningMonth {
  label: string;
  weeks: CleaningWeek[];
}

export interface CleaningScheduleOption {
  label: string;
  value: string;
}

const NONE_OPTION: CleaningScheduleOption = { label: "None", value: "" };

export function useCleaningSchedules() {
  const permissions = usePermissions();
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: major_entries } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ cm: cleanMajorCollection })
            .where(({ cm }) => eq(cm.congregation_id, congregation_id))
            .orderBy(({ cm }) => cm.week_id)
        : undefined,
    [congregation_id],
  );

  const { data: minor_entries } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ cm: cleanMinorCollection })
            .where(({ cm }) => eq(cm.congregation_id, congregation_id))
            .orderBy(({ cm }) => cm.week_id)
        : undefined,
    [congregation_id],
  );

  const { data: groups } = useLiveQuery(
    (q) =>
      congregation_id
        ? q.from({ g: groupCollection }).where(({ g }) => eq(g.congregation_id, congregation_id))
        : undefined,
    [congregation_id],
  );

  const is_loading =
    major_entries === undefined ||
    minor_entries === undefined ||
    groups === undefined ||
    !permissions.is_loaded;

  const major_map = new Map(
    ((major_entries as CleanMajor[] | undefined) ?? []).map((e) => [e.week_id, e.group_id]),
  );
  const minor_map = new Map(
    ((minor_entries as CleanMinor[] | undefined) ?? []).map((e) => [e.week_id, e.group_id]),
  );

  const group_options: CleaningScheduleOption[] = [
    NONE_OPTION,
    ...((groups as Group[] | undefined) ?? [])
      .filter((g) => g.congregation_id === congregation_id && g.id)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((g) => ({ label: g.name, value: g.id ?? "" })),
  ];

  const today = new Date();
  const current_year = today.getFullYear();
  const start = startOfWeek(today, { weekStartsOn: 1 });
  const latest_week = [...major_map.keys(), ...minor_map.keys()].sort().pop();
  const latest_year = latest_week ? parseISO(latest_week).getFullYear() : current_year;
  const end = endOfYear(new Date(Math.max(current_year, latest_year), 11, 31));
  const weeks: CleaningWeek[] = [];

  for (let d = start; d <= end; d = addWeeks(d, 1)) {
    const week_id = format(d, "yyyy-MM-dd");
    weeks.push({
      week_id,
      week_label: getTheocraticWeekLabel(week_id),
      major_group_id: major_map.get(week_id) ?? null,
      minor_group_id: minor_map.get(week_id) ?? null,
    });
  }

  const months = new Map<string, CleaningWeek[]>();
  for (const week of weeks) {
    const date = parseISO(week.week_id);
    const month_label =
      date.getFullYear() === current_year ? format(date, "MMMM") : format(date, "MMMM yyyy");
    const list = months.get(month_label) ?? [];
    list.push(week);
    months.set(month_label, list);
  }

  const month_groups: CleaningMonth[] = Array.from(months, ([label, weeks]) => ({
    label,
    weeks,
  }));

  const handle_major_change = (week_id: string, group_id: string) => {
    if (!congregation_id) return;
    const key = makeCompositeKey(week_id, congregation_id);
    if (group_id === "") {
      if (major_map.has(week_id)) cleanMajorCollection.delete(key);
      return;
    }
    if (major_map.get(week_id) === group_id) return;
    if (major_map.has(week_id)) {
      cleanMajorCollection.update(key, (draft) => {
        draft.group_id = group_id;
      });
    } else {
      cleanMajorCollection.insert({ week_id, congregation_id, group_id });
    }
  };

  const handle_minor_change = (week_id: string, group_id: string) => {
    if (!congregation_id) return;
    const key = makeCompositeKey(week_id, congregation_id);
    if (group_id === "") {
      if (minor_map.has(week_id)) cleanMinorCollection.delete(key);
      return;
    }
    if (minor_map.get(week_id) === group_id) return;
    if (minor_map.has(week_id)) {
      cleanMinorCollection.update(key, (draft) => {
        draft.group_id = group_id;
      });
    } else {
      cleanMinorCollection.insert({ week_id, congregation_id, group_id });
    }
  };

  return {
    months: month_groups,
    group_options,
    is_loading,
    can_edit:
      permissions.has_cleaning || permissions.is_super_admin || permissions.has_congregation_admin,
    on_major_change: handle_major_change,
    on_minor_change: handle_minor_change,
  };
}
