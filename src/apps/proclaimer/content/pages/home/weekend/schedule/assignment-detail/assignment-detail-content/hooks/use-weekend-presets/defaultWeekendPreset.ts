import type { WeekendFilterSortPreset } from "./types";

export const DEFAULT_WEEKEND_PRESET_ID = "default";

export function makeDefaultWeekendPreset(assignment_id: string): WeekendFilterSortPreset {
  return {
    id: DEFAULT_WEEKEND_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      participation_types: [assignment_id],
      stat_participation_types: [assignment_id],
      min_weeks_away_closest: 2,
      min_avg_weeks_between: 2,
    },
  };
}
