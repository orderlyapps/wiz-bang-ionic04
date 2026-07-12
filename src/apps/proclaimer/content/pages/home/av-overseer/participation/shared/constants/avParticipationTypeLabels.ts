export type AvParticipationType =
  | "video"
  | "audio"
  | "platform"
  | "microphone"
  | "entrance"
  | "auditorium"
  | "zoom";

export const avParticipationTypeLabels: Record<AvParticipationType, string> = {
  video: "Video",
  audio: "Audio",
  platform: "Platform",
  microphone: "Microphone",
  entrance: "Entrance",
  auditorium: "Auditorium",
  zoom: "Zoom",
};

export const avParticipationTypes = Object.keys(avParticipationTypeLabels) as AvParticipationType[];
