export type PublisherSortOrder = "alphabetical" | "weeks_away_closest" | "avg_weeks_between";

export const sortOrderLabels: Record<PublisherSortOrder, string> = {
  alphabetical: "Alphabetical",
  weeks_away_closest: "Weeks away from closest assignment",
  avg_weeks_between: "Average weeks between assignments",
};
