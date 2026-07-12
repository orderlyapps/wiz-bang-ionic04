export type PublisherSortOrder = "alphabetical" | "weeks_away_closest" | "avg_weeks_between";

export interface WeekendPublisherFilter {
  participation_types: string[];
  stat_participation_types: string[];
  min_weeks_away_closest: number;
  min_avg_weeks_between: number;
}

export interface WeekendFilterSortPreset {
  id: string;
  name: string;
  filter: WeekendPublisherFilter;
  sort_order: PublisherSortOrder;
}

export const sortOrderLabels: Record<PublisherSortOrder, string> = {
  alphabetical: "Alphabetical",
  weeks_away_closest: "Weeks from closest assignment",
  avg_weeks_between: "Average weeks between assignments",
};

export interface WeekendPublisherStats {
  publisher_id: string;
  weeks_away_closest: number | null;
  avg_weeks_between: number | null;
}
