import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MinistryTimeEntry } from "./useMinistryTime";

const REGULAR_PIONEER_YEARLY_HOURS = 600;
const CONTINUOUS_AUXILIARY_MONTHLY_HOURS = 30;
const SPECIAL_PIONEER_MONTHLY_HOURS = 100;

function getPioneerYearStart(now: Date): Date {
  const year = now.getFullYear();
  const sep1 = new Date(year, 8, 1);
  return now >= sep1 ? sep1 : new Date(year - 1, 8, 1);
}

function toISODate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export interface PioneerStatsData {
  type: Publisher["type"];
  hours_needed_this_month: number;
  hours_remaining?: number;
  avg_per_week?: number;
  avg_per_month?: number;
  hours_needed_this_month_for_avg?: number;
}

export function usePioneerStats(entries: MinistryTimeEntry[]): PioneerStatsData | null {
  const session = useAuthSession();
  const auth_user_id = session?.user?.id;
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const my_publisher = (publishers as Publisher[] | undefined)?.find(
    (p) => p.auth_id === auth_user_id,
  );

  if (!my_publisher) return null;

  const now = new Date();
  const current_month_prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const current_month_hours =
    entries
      .filter((e) => e.date.startsWith(current_month_prefix))
      .reduce((sum, e) => sum + e.minutes, 0) / 60;

  const type = my_publisher.type;

  if (type === "regular_pioneer") {
    const pioneer_start = getPioneerYearStart(now);
    const pioneer_start_str = toISODate(pioneer_start);

    const year_hours =
      entries.filter((e) => e.date >= pioneer_start_str).reduce((sum, e) => sum + e.minutes, 0) /
      60;

    const hours_remaining = Math.max(0, REGULAR_PIONEER_YEARLY_HOURS - year_hours);

    const pioneer_end = new Date(pioneer_start.getFullYear() + 1, 7, 30);
    const ms_per_week = 7 * 24 * 60 * 60 * 1000;
    const weeks_remaining = Math.max(1, (pioneer_end.getTime() - now.getTime()) / ms_per_week);

    const current_month = now.getMonth();
    const months_remaining = current_month <= 7 ? 7 - current_month + 1 : 20 - current_month;

    const avg_per_week = hours_remaining / weeks_remaining;
    const avg_per_month = hours_remaining / months_remaining;

    const hours_needed_this_month_for_avg = Math.max(0, avg_per_month - current_month_hours);

    return {
      type,
      hours_needed_this_month: hours_needed_this_month_for_avg,
      hours_remaining,
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
