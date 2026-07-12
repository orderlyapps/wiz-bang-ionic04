import type { PublisherFilter } from "../use-publisher-filter/types";

export interface FilterPreset {
  id: string;
  name: string;
  filter: PublisherFilter;
}

// Keep the old name for backward compatibility
export type FilterSortPreset = FilterPreset;
