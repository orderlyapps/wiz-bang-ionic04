import type { MinistryMapFilterSortPreset } from "./types";

export const MINISTRY_DEFAULT_PRESET_IDS = new Set([
  "ministry_default_all",
  "ministry_default_checked_out",
  "ministry_default_untagged",
]);

export const MINISTRY_DEFAULT_ACTIVE_PRESET_ID = "ministry_default_all";

export const defaultMinistryMapPresets: MinistryMapFilterSortPreset[] = [
  {
    id: "ministry_default_all",
    name: "All Maps",
    sort_order: "alphabetical",
    filter: {
      checked_out_only: false,
      untagged_only: false,
      tag_ids: [],
    },
  },
  {
    id: "ministry_default_checked_out",
    name: "Checked Out",
    sort_order: "recent_activity",
    filter: {
      checked_out_only: true,
      untagged_only: false,
      tag_ids: [],
    },
  },
  {
    id: "ministry_default_untagged",
    name: "Untagged",
    sort_order: "alphabetical",
    filter: {
      checked_out_only: false,
      untagged_only: true,
      tag_ids: [],
    },
  },
];
