export type CheckoutFilter = "any" | "checked_out_only" | "hide_checked_out";

export const checkoutFilterLabels: Record<CheckoutFilter, string> = {
  any: "All",
  checked_out_only: "Checked Out",
  hide_checked_out: "Checked In",
};

export type MapLogSortOrder = "alphabetical" | "recent_activity" | "oldest_activity";

export const sortOrderLabels: Record<MapLogSortOrder, string> = {
  alphabetical: "Alphabetical",
  recent_activity: "Recent Activity",
  oldest_activity: "Oldest Activity",
};

export type MapLogFilters = {
  checkout_filter: CheckoutFilter;
  untagged_only: boolean;
  tag_ids: string[];
  min_weeks_since_activity: number | null;
};

export interface MapLogFilterSortPreset {
  id: string;
  name: string;
  filter: MapLogFilters;
  sort_order: MapLogSortOrder;
}
