import type { AvParticipationType } from "../../utils/avParticipationTypeMap";
import type { PublisherSortOrder as _PublisherSortOrder } from "@proclaimer-content/pages/home/clam-overseer/schedule/assignment-detail/assignment-detail-content/components/publisher-selector/hooks/use-publisher-sort/types";
export type { PublisherSortOrder } from "@proclaimer-content/pages/home/clam-overseer/schedule/assignment-detail/assignment-detail-content/components/publisher-selector/hooks/use-publisher-sort/types";

export type GenderFilter = "all" | "male" | "female";

export interface AvPublisherFilter {
  gender: GenderFilter;
  min_weeks_away_closest: number;
  min_avg_weeks_between: number;
  participation_types: AvParticipationType[];
  stat_participation_types: AvParticipationType[];
}

export interface AvFilterSortPreset {
  id: string;
  name: string;
  filter: AvPublisherFilter;
  sort_order: _PublisherSortOrder;
}
