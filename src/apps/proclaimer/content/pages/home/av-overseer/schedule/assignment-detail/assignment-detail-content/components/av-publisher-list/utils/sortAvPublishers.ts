import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { PublisherSortOrder } from "../../../hooks/use-av-presets/types";
import type { AvPublisherStats } from "../../../hooks/use-av-publisher-stats/useAvPublisherStats";

export function sortAvPublishers(
  publishers: Publisher[],
  sort_order: PublisherSortOrder,
  stats: Map<string, AvPublisherStats>,
): Publisher[] {
  if (sort_order === "alphabetical") return publishers;

  return [...publishers].sort((a, b) => {
    const sa = a.id ? stats.get(a.id) : undefined;
    const sb = b.id ? stats.get(b.id) : undefined;

    const va =
      sort_order === "weeks_away_closest"
        ? (sa?.weeks_away_closest ?? -1)
        : (sa?.avg_weeks_between ?? -1);
    const vb =
      sort_order === "weeks_away_closest"
        ? (sb?.weeks_away_closest ?? -1)
        : (sb?.avg_weeks_between ?? -1);

    if (va === -1 && vb === -1)
      return getPublisherDisplayName(a).localeCompare(getPublisherDisplayName(b));
    if (va === -1) return -1;
    if (vb === -1) return 1;
    return vb - va;
  });
}
