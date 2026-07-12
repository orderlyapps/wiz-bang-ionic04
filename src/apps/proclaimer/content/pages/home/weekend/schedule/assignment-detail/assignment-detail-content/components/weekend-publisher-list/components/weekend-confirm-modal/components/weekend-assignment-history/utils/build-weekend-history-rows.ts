import { differenceInWeeks, parseISO } from "date-fns";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import { avAssignmentLabels } from "@shared/database/schemas/av-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import { weekendAssignmentLabels } from "@shared/database/schemas/weekend-assignment";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";

export interface WeekendAssignmentRow {
  week_id: string;
  assignment_label: string;
  meeting_label: string;
  weeks_away: number;
  is_future: boolean;
  is_current: boolean;
}

export function buildWeekendHistoryRows(
  publisher_id: string,
  week_id: string,
  weekend_assignments: WeekendAssignment[],
  speaker_assignments: SpeakerAssignment[],
  av_assignments: AvAssignment[],
): WeekendAssignmentRow[] {
  const current_date = parseISO(week_id);

  const pub_weekend = weekend_assignments.filter((a) => a.participant_id === publisher_id);
  const pub_speaker = speaker_assignments.filter((a) => a.speaker_id === publisher_id);
  const pub_av_current = av_assignments.filter(
    (a) => a.participant_id === publisher_id && a.week_id === week_id,
  );

  function weekendRow(
    a: WeekendAssignment,
    is_current: boolean,
    is_future: boolean,
  ): WeekendAssignmentRow {
    return {
      week_id: a.week_id,
      assignment_label: weekendAssignmentLabels[a.assignment_id] ?? a.assignment_id,
      meeting_label: "Weekend",
      weeks_away: Math.abs(differenceInWeeks(parseISO(a.week_id), current_date)),
      is_future,
      is_current,
    };
  }

  function speakerRow(w: string, is_current: boolean, is_future: boolean): WeekendAssignmentRow {
    return {
      week_id: w,
      assignment_label: "Speaker",
      meeting_label: "Weekend",
      weeks_away: Math.abs(differenceInWeeks(parseISO(w), current_date)),
      is_future,
      is_current,
    };
  }

  const past_weekend = pub_weekend
    .filter((a) => a.week_id < week_id)
    .sort((a, b) => b.week_id.localeCompare(a.week_id))
    .slice(0, 5)
    .map((a) => weekendRow(a, false, false));

  const current_weekend = pub_weekend
    .filter((a) => a.week_id === week_id)
    .map((a) => weekendRow(a, true, false));

  const future_weekend = pub_weekend
    .filter((a) => a.week_id > week_id)
    .sort((a, b) => a.week_id.localeCompare(b.week_id))
    .map((a) => weekendRow(a, false, true));

  const past_speaker = pub_speaker
    .filter((a) => a.week_id < week_id)
    .sort((a, b) => b.week_id.localeCompare(a.week_id))
    .slice(0, 3)
    .map((a) => speakerRow(a.week_id, false, false));

  const current_speaker = pub_speaker
    .filter((a) => a.week_id === week_id)
    .map((a) => speakerRow(a.week_id, true, false));

  const future_speaker = pub_speaker
    .filter((a) => a.week_id > week_id)
    .sort((a, b) => a.week_id.localeCompare(b.week_id))
    .map((a) => speakerRow(a.week_id, false, true));

  const current_av: WeekendAssignmentRow[] = pub_av_current.map((a) => ({
    week_id: a.week_id,
    assignment_label: avAssignmentLabels[a.assignment_id] ?? a.assignment_id,
    meeting_label: a.assignment_id.includes("midweek") ? "Midweek AV" : "Weekend AV",
    weeks_away: 0,
    is_future: false,
    is_current: true,
  }));

  return [
    ...past_weekend,
    ...current_weekend,
    ...future_weekend,
    ...past_speaker,
    ...current_speaker,
    ...future_speaker,
    ...current_av,
  ].sort((a, b) => a.week_id.localeCompare(b.week_id));
}
