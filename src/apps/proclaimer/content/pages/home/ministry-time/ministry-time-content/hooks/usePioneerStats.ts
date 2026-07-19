import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { getServiceYear, getServiceYearStart } from "@util/format/service-year";
import type { MinistryTimeEntry } from "./useMinistryTime";
import { usePioneerSettings } from "./usePioneerSettings";

const CONTINUOUS_AUXILIARY_MONTHLY_HOURS = 30;
const SPECIAL_PIONEER_MONTHLY_HOURS = 100;
const CREDIT_TYPES = ["ldc", "bethel", "hlc", "school"];
const MONTHLY_HOUR_CAP = 55;

function toISODate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export interface PioneerStatsData {
  type: "regular_pioneer" | "special_pioneer" | "continuous_auxiliary";
  hours_needed_this_month: number;
  hours_remaining?: number;
  raw_hours_remaining?: number;
  avg_per_week?: number;
  avg_per_month?: number;
  hours_needed_this_month_for_avg?: number;
}

export function usePioneerStats(entries: MinistryTimeEntry[]): PioneerStatsData | null {
  const my_publisher = useStoredPublisher();
  const { getCurrentServiceYearHours } = usePioneerSettings();
  if (!my_publisher) return null;

  const now = new Date();
  const regular_pioneer_yearly_hours = getCurrentServiceYearHours();
  const current_month_prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const current_month_hours =
    entries
      .filter((e) => e.date.startsWith(current_month_prefix))
      .reduce((sum, e) => sum + e.minutes, 0) / 60;

  const type = my_publisher.type;

  if (type === "regular_pioneer") {
    const pioneer_start = getServiceYearStart(getServiceYear(now));
    const pioneer_start_str = toISODate(pioneer_start);

    const year_entries = entries.filter((e) => e.date >= pioneer_start_str);

    const month_map = new Map<string, { non_credit: number; credit: number }>();
    for (const e of year_entries) {
      const month_key = e.date.slice(0, 7);
      const entry = month_map.get(month_key) ?? { non_credit: 0, credit: 0 };
      if (CREDIT_TYPES.includes(e.ministry_type)) {
        entry.credit += e.minutes;
      } else {
        entry.non_credit += e.minutes;
      }
      month_map.set(month_key, entry);
    }

    let credited_minutes = 0;
    for (const { non_credit, credit } of month_map.values()) {
      const non_credit_hours = non_credit / 60;
      if (non_credit_hours >= MONTHLY_HOUR_CAP) {
        credited_minutes += non_credit;
      } else {
        const capped_hours = Math.min(MONTHLY_HOUR_CAP, non_credit_hours + credit / 60);
        credited_minutes += capped_hours * 60;
      }
    }

    const year_hours = credited_minutes / 60;
    const raw_year_hours = year_entries.reduce((sum, e) => sum + e.minutes, 0) / 60;

    const hours_remaining = Math.max(0, regular_pioneer_yearly_hours - year_hours);
    const raw_hours_remaining = Math.max(0, regular_pioneer_yearly_hours - raw_year_hours);

    const pioneer_end = new Date(pioneer_start.getFullYear() + 1, 7, 30);
    const ms_per_week = 7 * 24 * 60 * 60 * 1000;
    const weeks_remaining = Math.max(1, (pioneer_end.getTime() - now.getTime()) / ms_per_week);

    const current_month = now.getMonth();
    const months_remaining = current_month <= 7 ? 7 - current_month + 1 : 20 - current_month;

    const avg_per_week = hours_remaining / weeks_remaining;
    const hours_remaining_excluding_current = hours_remaining + current_month_hours;
    // const months_remaining_excluding_current = Math.max(1, months_remaining - 1);
    const avg_per_month = hours_remaining_excluding_current / months_remaining;

    const hours_needed_this_month_for_avg = Math.max(0, avg_per_month - current_month_hours);

    return {
      type,
      hours_needed_this_month: hours_needed_this_month_for_avg,
      hours_remaining,
      raw_hours_remaining,
      avg_per_week,
      avg_per_month,
      hours_needed_this_month_for_avg,
    };
  }

  if (type === "continuous_auxiliary") {
    return {
      type,
      hours_needed_this_month: Math.max(
        0,
        CONTINUOUS_AUXILIARY_MONTHLY_HOURS - current_month_hours,
      ),
    };
  }

  if (type === "special_pioneer") {
    return {
      type,
      hours_needed_this_month: Math.max(0, SPECIAL_PIONEER_MONTHLY_HOURS - current_month_hours),
    };
  }

  return null;
}
