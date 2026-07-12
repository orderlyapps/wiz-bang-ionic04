import { differenceInWeeks, parseISO } from "date-fns";
import type { AvAssignment, AvAssignmentID } from "@shared/database/schemas/av-assignment";
import { avAssignmentLabels } from "@shared/database/schemas/av-assignment";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";

export interface AssignmentRow {
  week_id: string;
  assignment_label: string;
  meeting_label: string;
  weeks_away: number;
  is_future: boolean;
  is_current: boolean;
}

function formatAssignmentLabel(assignment_id: string): string {
  return assignment_id
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function avAssignmentRow(
  assignment: AvAssignment,
  current_date: Date,
  is_current: boolean,
  is_future: boolean,
): AssignmentRow {
  return {
    week_id: assignment.week_id,
    assignment_label:
      avAssignmentLabels[assignment.assignment_id as keyof typeof avAssignmentLabels] ??
      assignment.assignment_id.replace(/_/g, " "),
    meeting_label: assignment.assignment_id.includes("midweek") ? "Midweek" : "Weekend",
    weeks_away: Math.abs(differenceInWeeks(parseISO(assignment.week_id), current_date)),
    is_future,
    is_current,
  };
}

function clamAssignmentRow(
  assignment: MidweekAssignment | WeekendAssignment,
  current_date: Date,
  is_current: boolean,
  is_future: boolean,
  meeting_label: string,
): AssignmentRow {
  return {
    week_id: assignment.week_id,
    assignment_label: formatAssignmentLabel(assignment.assignment_id),
    meeting_label,
    weeks_away: Math.abs(differenceInWeeks(parseISO(assignment.week_id), current_date)),
    is_future,
    is_current,
  };
}

export function buildHistoryRows(
  publisher_id: string,
  week_id: string,
  assignment_id: AvAssignmentID,
  all_assignments: AvAssignment[],
  midweek_assignments: MidweekAssignment[],
  weekend_assignments: WeekendAssignment[],
  speaker_assignments: SpeakerAssignment[],
): AssignmentRow[] {
  const current_date = parseISO(week_id);
  const is_midweek = assignment_id.includes("midweek");

  const publisher_av = all_assignments.filter((a) => a.participant_id === publisher_id);
  const publisher_midweek = midweek_assignments.filter((a) => a.participant_id === publisher_id);
  const publisher_weekend = weekend_assignments.filter((a) => a.participant_id === publisher_id);
  const publisher_speaker = speaker_assignments.filter((a) => a.speaker_id === publisher_id);

  const av_past = publisher_av
    .filter((a) => a.week_id < week_id)
    .sort((a, b) => b.week_id.localeCompare(a.week_id))
    .slice(0, 5)
    .map((a) => avAssignmentRow(a, current_date, false, false));

  const av_current = publisher_av
    .filter((a) => a.week_id === week_id)
    .map((a) => avAssignmentRow(a, current_date, true, false));

  const av_future = publisher_av
    .filter((a) => a.week_id > week_id)
    .sort((a, b) => a.week_id.localeCompare(b.week_id))
    .map((a) => avAssignmentRow(a, current_date, false, true));

  const past_midweek = publisher_midweek
    .filter((a) => a.week_id < week_id)
    .sort((a, b) => b.week_id.localeCompare(a.week_id))
    .slice(0, 1)
    .map((a) => clamAssignmentRow(a, current_date, false, false, "Midweek"));

  const past_weekend = publisher_weekend
    .filter((a) => a.week_id < week_id)
    .sort((a, b) => b.week_id.localeCompare(a.week_id))
    .slice(0, 1)
    .map((a) => clamAssignmentRow(a, current_date, false, false, "Weekend"));

  const future_weekend = publisher_weekend
    .filter((a) => a.week_id > week_id)
    .sort((a, b) => a.week_id.localeCompare(b.week_id))
    .slice(0, 1)
    .map((a) => clamAssignmentRow(a, current_date, false, true, "Weekend"));

  const future_midweek = publisher_midweek
    .filter((a) => a.week_id > week_id)
    .sort((a, b) => a.week_id.localeCompare(b.week_id))
    .slice(0, 1)
    .map((a) => clamAssignmentRow(a, current_date, false, true, "Midweek"));

  const current_midweek = is_midweek
    ? publisher_midweek
        .filter((a) => a.week_id === week_id)
        .map((a) => clamAssignmentRow(a, current_date, true, false, "Midweek"))
    : [];

  const current_weekend = !is_midweek
    ? publisher_weekend
        .filter((a) => a.week_id === week_id)
        .map((a) => clamAssignmentRow(a, current_date, true, false, "Weekend"))
    : [];

  const current_speaker = !is_midweek
    ? publisher_speaker
        .filter((a) => a.week_id === week_id)
        .slice(0, 1)
        .map(() => ({
          week_id: week_id,
          assignment_label: "Speaker",
          meeting_label: "Weekend",
          weeks_away: 0,
          is_future: false,
          is_current: true,
        }))
    : [];

  return [
    ...av_past,
    ...av_current,
    ...av_future,
    ...past_midweek,
    ...past_weekend,
    ...future_weekend,
    ...future_midweek,
    ...current_midweek,
    ...current_weekend,
    ...current_speaker,
  ].sort((a, b) => a.week_id.localeCompare(b.week_id));
}
