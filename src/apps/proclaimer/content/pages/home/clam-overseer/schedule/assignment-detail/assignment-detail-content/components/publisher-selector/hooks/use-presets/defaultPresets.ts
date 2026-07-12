import type { ParticipationType } from "../../utils/participationTypeMap";
import type { FilterSortPreset } from "./types";

export const DEFAULT_PRESET_ID = "default";

export const defaultPresets: Record<ParticipationType, FilterSortPreset> = {
  prayer: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 1,
      min_avg_weeks_between: 1,
      participation_types: ["prayer"],
      stat_participation_types: ["prayer"],
    },
  },
  chairman: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 2,
      min_avg_weeks_between: 2,
      participation_types: ["chairman"],
      stat_participation_types: ["chairman"],
    },
  },
  counselor: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 2,
      min_avg_weeks_between: 2,
      participation_types: ["counselor"],
      stat_participation_types: ["counselor"],
    },
  },
  bible_reading: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 6,
      min_avg_weeks_between: 2,
      participation_types: ["bible_reading"],
      stat_participation_types: ["bible_reading"],
    },
  },
  apply: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "all",
      min_weeks_away_closest: 6,
      min_avg_weeks_between: 6,
      participation_types: ["apply"],
      stat_participation_types: ["apply"],
    },
  },
  assistant: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "all",
      min_weeks_away_closest: 3,
      min_avg_weeks_between: 3,
      participation_types: ["assistant"],
      stat_participation_types: ["assistant"],
    },
  },
  treasures: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 4,
      min_avg_weeks_between: 2,
      participation_types: ["treasures"],
      stat_participation_types: ["treasures"],
    },
  },
  gems: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 2,
      min_avg_weeks_between: 2,
      participation_types: ["gems"],
      stat_participation_types: ["gems"],
    },
  },
  living: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 4,
      min_avg_weeks_between: 2,
      participation_types: ["living"],
      stat_participation_types: ["living"],
    },
  },
  cbs_conductor: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 4,
      min_avg_weeks_between: 2,
      participation_types: ["cbs_conductor"],
      stat_participation_types: ["cbs_conductor"],
    },
  },
  cbs_reader: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 4,
      min_avg_weeks_between: 2,
      participation_types: ["cbs_reader"],
      stat_participation_types: ["cbs_reader"],
    },
  },
};
