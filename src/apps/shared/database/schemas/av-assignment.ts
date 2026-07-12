// import { z } from "zod";

// export const avAssignmentSchema = z.object({
//   participant_id: z.uuid(),
//   assignment_id: z.string(),
//   congregation_id: z.uuid(),
//   week_id: z.string(),
// });

// export type AvAssignment = z.infer<typeof avAssignmentSchema>;

import { z } from "zod";

export const midweekAVAssignmentIDs = [
  "video_midweek",
  "audio_midweek",
  "platform_midweek",
  "microphone_1_midweek",
  "microphone_2_midweek",
] as const;

export const midweekAttendantAssignmentIDs = [
  "entrance_midweek",
  "auditorium_midweek",
  "zoom_midweek",
] as const;

export const weekendAVAssignmentIDs = [
  "video_weekend",
  "audio_weekend",
  "platform_weekend",
  "microphone_1_weekend",
  "microphone_2_weekend",
] as const;

export const weekendAttendantAssignmentIDs = [
  "entrance_weekend",
  "auditorium_weekend",
  "zoom_weekend",
] as const;

export const avAssignmentLabels: Record<string, string> = {
  // Midweek AV assignments
  video_midweek: "Video",
  audio_midweek: "Audio",
  platform_midweek: "Platform",
  microphone_1_midweek: "Microphone",
  microphone_2_midweek: "Microphone",
  entrance_midweek: "Entrance",
  auditorium_midweek: "Auditorium",
  zoom_midweek: "Zoom",

  // Weekend AV assignments
  video_weekend: "Video",
  audio_weekend: "Audio",
  platform_weekend: "Platform",
  microphone_1_weekend: "Microphone",
  microphone_2_weekend: "Microphone",

  // Weekend attendant assignments
  entrance_weekend: "Entrance",
  auditorium_weekend: "Auditorium",
  zoom_weekend: "Zoom",
};

export const avAssignmentIDs = [
  ...midweekAVAssignmentIDs,
  ...midweekAttendantAssignmentIDs,
  ...weekendAVAssignmentIDs,
  ...weekendAttendantAssignmentIDs,
] as const;

export const avAssignmentIDSchema = z.union(avAssignmentIDs.map((option) => z.literal(option)));

export type AvAssignmentID = z.infer<typeof avAssignmentIDSchema>;

export const avAssignmentSchema = z.object({
  assignment_id: avAssignmentIDSchema,
  week_id: z.string(),
  congregation_id: z.uuid(),
  participant_id: z.uuid(),
});

export type AvAssignment = z.infer<typeof avAssignmentSchema>;
