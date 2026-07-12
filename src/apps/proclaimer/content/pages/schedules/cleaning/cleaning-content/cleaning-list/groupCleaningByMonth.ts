import { format, parseISO, startOfWeek } from "date-fns";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";

export type CleaningEntry = {
  week_id: string;
  congregation_id: string;
  group_id: string;
  type: "major" | "minor";
};

export type WeekGroup = {
  week_id: string;
  week_label: string;
  entries: CleaningEntry[];
};

export type MonthGroup = {
  label: string;
  weeks: WeekGroup[];
};

const current_year = new Date().getFullYear();

export function groupCleaningByMonth(entries: CleaningEntry[]): MonthGroup[] {
  const this_week_id = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
  const months = new Map<string, Map<string, CleaningEntry[]>>();

  for (const entry of entries) {
    if (entry.week_id < this_week_id) continue;

    const date = parseISO(entry.week_id);
    const pattern = date.getFullYear() === current_year ? "MMMM" : "MMMM yyyy";
    const month_key = format(date, pattern);

    let week_map = months.get(month_key);
    if (!week_map) {
      week_map = new Map();
      months.set(month_key, week_map);
    }

    const existing = week_map.get(entry.week_id);
    if (existing) {
      existing.push(entry);
    } else {
      week_map.set(entry.week_id, [entry]);
    }
  }

  return Array.from(months, ([label, week_map]) => ({
    label,
    weeks: Array.from(week_map, ([week_id, entries]) => ({
      week_id,
      week_label: getTheocraticWeekLabel(week_id),
      entries,
    })),
  }));
}
