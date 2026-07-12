import type { PublisherSortOrder } from "../../publisher-selector/hooks/use-publisher-sort/usePublisherSort";
import type { PublisherStats } from "../../publisher-selector/hooks/use-publisher-stats/usePublisherStats";

export function getStatLabel(
  publisher_id: string | undefined,
  sort_order: PublisherSortOrder,
  stats: Map<string, PublisherStats>,
): string | undefined {
  if (sort_order === "alphabetical" || !publisher_id) return undefined;
  const s = stats.get(publisher_id);
  if (!s) return undefined;
  if (sort_order === "weeks_away_closest") {
    return s.weeks_away_closest !== null ? `${s.weeks_away_closest}w` : undefined;
  }
  return s.avg_weeks_between !== null ? `~${s.avg_weeks_between.toFixed(1)}w` : undefined;
}
