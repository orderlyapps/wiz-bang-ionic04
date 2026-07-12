import type { PublisherFilter } from "../use-publisher-filter/usePublisherFilter";
import type { PublisherSortOrder } from "../use-publisher-sort/types";

export interface FilterSortPreset {
  id: string;
  name: string;
  filter: PublisherFilter;
  sort_order: PublisherSortOrder;
}
