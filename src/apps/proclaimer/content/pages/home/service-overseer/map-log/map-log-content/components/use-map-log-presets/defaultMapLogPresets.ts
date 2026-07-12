import type { MapLogFilterSortPreset } from "./types";

export const DEFAULT_PRESET_IDS = new Set([
  "default_all",
  "default_checked_out",
  "default_needs_attention",
]);

export const DEFAULT_ACTIVE_PRESET_ID = "default_all";

export const defaultMapLogPresets: MapLogFilterSortPreset[] = [
  {
    id: "default_all",
    name: "All Maps",
    sort_order: "alphabetical",
    filter: {
      checkout_filter: "any",
      untagged_only: false,
      tag_ids: [],
      min_weeks_since_activity: null,
    },
  },
  {
    id: "default_checked_out",
    name: "Checked Out",
    sort_order: "recent_activity",
    filter: {
      checkout_filter: "checked_out_only",
      untagged_only: false,
      tag_ids: [],
      min_weeks_since_activity: null,
    },
  },
  {
    id: "default_needs_attention",
    name: "Needs Attention",
    sort_order: "oldest_activity",
    filter: {
      checkout_filter: "any",
      untagged_only: false,
      tag_ids: [],
      min_weeks_since_activity: 4,
    },
  },
];
