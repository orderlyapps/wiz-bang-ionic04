export type MinistryMapSortOrder = "alphabetical" | "recent_activity";

export const ministrySortOrderLabels: Record<MinistryMapSortOrder, string> = {
  alphabetical: "Alphabetical",
  recent_activity: "Recent Activity",
};

export type MinistryMapFilters = {
  checked_out_only: boolean;
  untagged_only: boolean;
  tag_ids: string[];
};

export interface MinistryMapFilterSortPreset {
  id: string;
  name: string;
  filter: MinistryMapFilters;
  sort_order: MinistryMapSortOrder;
}
