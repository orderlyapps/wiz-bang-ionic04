import type { AvParticipationType } from "../../utils/avParticipationTypeMap";
import type { AvFilterSortPreset } from "./types";

export const DEFAULT_AV_PRESET_ID = "default";

const makeDefault = (participation_type: AvParticipationType): AvFilterSortPreset => ({
  id: DEFAULT_AV_PRESET_ID,
  name: "Default",
  sort_order: "weeks_away_closest",
  filter: {
    gender: "male",
    min_weeks_away_closest: 2,
    min_avg_weeks_between: 2,
    participation_types: [participation_type],
    stat_participation_types: [participation_type],
  },
});

export const defaultAvPresets: Record<AvParticipationType, AvFilterSortPreset> = {
  video: makeDefault("video"),
  audio: makeDefault("audio"),
  platform: makeDefault("platform"),
  microphone: makeDefault("microphone"),
  entrance: makeDefault("entrance"),
  auditorium: makeDefault("auditorium"),
  zoom: makeDefault("zoom"),
};
