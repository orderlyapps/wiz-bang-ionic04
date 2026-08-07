import type { FilterSortPreset } from "./types";

export const DEFAULT_PRESET_ID = "default";

export const defaultPresets: FilterSortPreset[] = [
  {
    id: DEFAULT_PRESET_ID,
    name: "All Publishers",
    filter: {
      gender: "all",
      standing: ["publisher", "elder", "ministerial_servant", "unbaptised_publisher"],
      type: [
        "continuous_auxiliary",
        "regular_pioneer",
        "special_pioneer",
        "publisher",
        "circuit_overseer",
      ],
      archived: "exclude",
    },
  },
  {
    id: "brothers",
    name: "Brothers",
    filter: {
      gender: "male",
      standing: ["publisher", "elder", "ministerial_servant", "unbaptised_publisher"],
      type: [
        "continuous_auxiliary",
        "regular_pioneer",
        "special_pioneer",
        "publisher",
        "circuit_overseer",
      ],
      archived: "exclude",
    },
  },
  {
    id: "sisters",
    name: "Sisters",
    filter: {
      gender: "female",
      standing: ["publisher", "unbaptised_publisher"],
      type: ["continuous_auxiliary", "regular_pioneer", "special_pioneer", "publisher"],
      archived: "exclude",
    },
  },
  {
    id: "elders",
    name: "Elders",
    filter: {
      gender: "male",
      standing: ["elder"],
      type: [
        "continuous_auxiliary",
        "regular_pioneer",
        "special_pioneer",
        "publisher",
        "circuit_overseer",
      ],
      archived: "exclude",
    },
  },
  {
    id: "ministerial_servants",
    name: "Ministerial Servants",
    filter: {
      gender: "male",
      standing: ["ministerial_servant"],
      type: ["continuous_auxiliary", "regular_pioneer", "special_pioneer", "publisher"],
      archived: "exclude",
    },
  },
  {
    id: "regular_pioneers",
    name: "Regular Pioneers",
    filter: {
      gender: "all",
      standing: ["elder", "ministerial_servant", "publisher"],
      type: ["regular_pioneer", "special_pioneer"],
      archived: "exclude",
    },
  },
  {
    id: "inactive",
    name: "Inactive",
    filter: {
      gender: "all",
      standing: ["publisher"],
      type: ["inactive"],
      archived: "exclude",
    },
  },
  {
    id: "unbaptised",
    name: "Unbaptised",
    filter: {
      gender: "all",
      standing: ["unbaptised_publisher"],
      type: ["publisher", "special_pioneer"],
      archived: "exclude",
    },
  },
  {
    id: "archived",
    name: "Archived",
    filter: {
      gender: "all",
      standing: "all",
      type: "all",
      archived: "only",
    },
  },
];
