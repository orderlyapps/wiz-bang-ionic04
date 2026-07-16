export type MidweekParticipationType =
  | "chairman"
  | "prayer"
  | "treasures"
  | "gems"
  | "bible_reading"
  | "apply"
  | "talk"
  | "assistant"
  | "counselor"
  | "living"
  | "cbs_conductor"
  | "cbs_reader";

export const midweekParticipationTypeLabels: Record<MidweekParticipationType, string> = {
  chairman: "Chairman",
  prayer: "Prayer",
  treasures: "Treasures",
  gems: "Gems",
  bible_reading: "Bible Reading",
  apply: "Apply",
  talk: "Talk",
  assistant: "Assistant",
  counselor: "Counselor",
  living: "Living",
  cbs_conductor: "CBS Conductor",
  cbs_reader: "CBS Reader",
};

export const midweekParticipationTypes = Object.keys(
  midweekParticipationTypeLabels,
) as MidweekParticipationType[];
