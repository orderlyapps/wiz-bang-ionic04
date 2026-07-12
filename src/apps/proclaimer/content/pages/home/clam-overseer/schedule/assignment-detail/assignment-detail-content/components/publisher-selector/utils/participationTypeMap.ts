import type { MidweekAssignmentId } from "@shared/database/schemas/midweek-assignment";

export type ParticipationType =
  | "prayer"
  | "treasures"
  | "gems"
  | "bible_reading"
  | "apply"
  | "assistant"
  | "chairman"
  | "counselor"
  | "living"
  | "cbs_conductor"
  | "cbs_reader";

export const participationTypeMap: Record<MidweekAssignmentId, ParticipationType> = {
  prayer_1: "prayer",
  treasures: "treasures",
  gems: "gems",
  school_1_bible_reading: "bible_reading",
  school_1_apply_1: "apply",
  school_1_assistant_1: "assistant",
  school_1_apply_2: "apply",
  school_1_assistant_2: "assistant",
  school_1_apply_3: "apply",
  school_1_assistant_3: "assistant",
  school_1_apply_4: "apply",
  school_1_assistant_4: "assistant",
  chairman_1: "chairman",
  chairman_2: "counselor",
  school_2_bible_reading: "bible_reading",
  school_2_apply_1: "apply",
  school_2_assistant_1: "assistant",
  school_2_apply_2: "apply",
  school_2_assistant_2: "assistant",
  school_2_apply_3: "apply",
  school_2_assistant_3: "assistant",
  school_2_apply_4: "apply",
  school_2_assistant_4: "assistant",
  chairman_3: "counselor",
  school_3_bible_reading: "bible_reading",
  school_3_apply_1: "apply",
  school_3_assistant_1: "assistant",
  school_3_apply_2: "apply",
  school_3_assistant_2: "assistant",
  school_3_apply_3: "apply",
  school_3_assistant_3: "assistant",
  school_3_apply_4: "apply",
  school_3_assistant_4: "assistant",
  living_1: "living",
  living_2: "living",
  cbs_conductor: "cbs_conductor",
  cbs_reader: "cbs_reader",
  prayer_2: "prayer",
};
