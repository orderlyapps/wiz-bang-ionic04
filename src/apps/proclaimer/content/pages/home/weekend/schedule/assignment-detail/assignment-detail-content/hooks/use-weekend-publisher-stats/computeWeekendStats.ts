import { differenceInWeeks, parseISO } from "date-fns";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { WeekendPublisherStats } from "../use-weekend-presets/types";

export function computeWeekendStats(
  assignments: WeekendAssignment[],
  stat_assignment_ids: string[],
  current_week_id: string,
): Map<string, WeekendPublisherStats> {
  const relevant_ids = new Set(stat_assignment_ids);
  const current_date = parseISO(current_week_id);
  const by_publisher = new Map<string, string[]>();

  for (const a of assignments) {
    if (!relevant_ids.has(a.assignment_id)) continue;
    if (!by_publisher.has(a.participant_id)) by_publisher.set(a.participant_id, []);
    by_publisher.get(a.participant_id)!.push(a.week_id);
  }

  const stats = new Map<string, WeekendPublisherStats>();
  for (const [publisher_id, week_ids] of by_publisher) {
    const past_weeks = week_ids
      .filter((w) => w < current_week_id)
      .sort()
      .reverse();
    const future_weeks = week_ids.filter((w) => w > current_week_id).sort();

    let weeks_away_closest: number | null = null;
    if (past_weeks.length > 0) {
      weeks_away_closest = differenceInWeeks(current_date, parseISO(past_weeks[0]));
    }
    if (future_weeks.length > 0) {
      const weeks_away = differenceInWeeks(parseISO(future_weeks[0]), current_date);
      if (weeks_away_closest === null || weeks_away < weeks_away_closest) {
        weeks_away_closest = weeks_away;
      }
    }

    let avg_weeks_between: number | null = null;
    if (past_weeks.length >= 2) {
      const sorted = [...past_weeks].sort();
      let total_gap = 0;
      for (let i = 1; i < sorted.length; i++) {
        total_gap += differenceInWeeks(parseISO(sorted[i]), parseISO(sorted[i - 1]));
      }
      avg_weeks_between = total_gap / (sorted.length - 1);
    }

    stats.set(publisher_id, { publisher_id, weeks_away_closest, avg_weeks_between });
  }

  return stats;
}
