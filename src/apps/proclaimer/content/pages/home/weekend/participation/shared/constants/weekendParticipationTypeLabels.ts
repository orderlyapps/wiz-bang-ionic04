export type WeekendParticipationType = "chairman" | "reader";

export const weekendParticipationTypeLabels: Record<WeekendParticipationType, string> = {
  chairman: "Chairman",
  reader: "Reader",
};

export const weekendParticipationTypes = Object.keys(
  weekendParticipationTypeLabels,
) as WeekendParticipationType[];
