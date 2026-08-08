import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { AssignmentItem } from "./types";
import { formatLabel } from "./format-label";
import { hasAssignment } from "./has-assignment";

export type CircuitVisitInfo = {
  theme: string;
  overseer_name?: string;
};

export function getMeetingParts(
  data: MidweekMeetingData,
  assignments: MidweekAssignment[] | undefined,
  show_school_2: boolean,
  circuit_visit?: CircuitVisitInfo,
  can_edit: boolean = false,
): AssignmentItem[] {
  const parts: AssignmentItem[] = [];
  const show_circuit_theme = !!circuit_visit?.theme;

  // Chairman
  parts.push({
    title: "Chairman",
    time: null,
    assignmentId: "chairman_1",
    color: "medium",
  });

  // Opening prayer
  parts.push({
    title: "Opening Prayer",
    time: null,
    assignmentId: "prayer_1",
    color: "medium",
  });

  // TGW - Treasures from God's Word
  if (data.mwb_tgw_talk_title) {
    parts.push({
      title: data.mwb_tgw_talk_title,
      time: null,
      assignmentId: "treasures",
      color: "jw_slate",
      pin_to_first_column: true,
    });
  }
  if (data.mwb_tgw_gems_title) {
    parts.push({
      title: data.mwb_tgw_gems_title,
      time: null,
      assignmentId: "gems",
      color: "jw_slate",
    });
  }

  // School 1
  if (show_school_2) {
    parts.push({
      title: "Main Hall",
      time: null,
      assignmentId: "main_hall_label",
      color: "medium",
      pin_to_first_column: true,
    });
  }
  if (data.mwb_tgw_bread_title) {
    parts.push({
      title: data.mwb_tgw_bread_title,
      time: null,
      assignmentId: "school_1_bible_reading",
      color: "jw_slate",
      pin_to_first_column: show_school_2,
    });
  }
  if (data.mwb_ayf_part1_title) {
    parts.push({
      title: formatLabel(data.mwb_ayf_part1_title, data.mwb_ayf_part1_time),
      time: null,
      assignmentId: "school_1_apply_1",
      color: "jw_brown",
      assistantId: "school_1_assistant_1",
      pin_to_first_column: !show_school_2,
    });
  }
  if (data.mwb_ayf_part2_title) {
    parts.push({
      title: formatLabel(data.mwb_ayf_part2_title, data.mwb_ayf_part2_time),
      time: null,
      assignmentId: "school_1_apply_2",
      color: "jw_brown",
      assistantId: "school_1_assistant_2",
    });
  }
  if (data.mwb_ayf_part3_title) {
    parts.push({
      title: formatLabel(data.mwb_ayf_part3_title, data.mwb_ayf_part3_time),
      time: null,
      assignmentId: "school_1_apply_3",
      color: "jw_brown",
      assistantId: "school_1_assistant_3",
    });
  }
  if (data.mwb_ayf_part4_title) {
    parts.push({
      title: formatLabel(data.mwb_ayf_part4_title, data.mwb_ayf_part4_time),
      time: null,
      assignmentId: "school_1_apply_4",
      color: "jw_brown",
      assistantId: "school_1_assistant_4",
    });
  }

  // School 2
  if (show_school_2) {
    parts.push({
      title: "Second School",
      time: null,
      assignmentId: "second_school_label",
      color: "medium",
      pin_to_first_column: true,
    });
    parts.push({
      title: "Counselor",
      time: null,
      assignmentId: "chairman_2",
      color: "medium",
      pin_to_first_column: true,
    });
    if (data.mwb_tgw_bread_title) {
      parts.push({
        title: data.mwb_tgw_bread_title,
        time: null,
        assignmentId: "school_2_bible_reading",
        color: "jw_slate",
        pin_to_first_column: true,
      });
    }
    if (data.mwb_ayf_part1_title) {
      parts.push({
        title: formatLabel(data.mwb_ayf_part1_title, data.mwb_ayf_part1_time),
        time: null,
        assignmentId: "school_2_apply_1",
        color: "jw_brown",
        assistantId: "school_2_assistant_1",
      });
    }
    if (data.mwb_ayf_part2_title) {
      parts.push({
        title: formatLabel(data.mwb_ayf_part2_title, data.mwb_ayf_part2_time),
        time: null,
        assignmentId: "school_2_apply_2",
        color: "jw_brown",
        assistantId: "school_2_assistant_2",
      });
    }
    if (data.mwb_ayf_part3_title) {
      parts.push({
        title: formatLabel(data.mwb_ayf_part3_title, data.mwb_ayf_part3_time),
        time: null,
        assignmentId: "school_2_apply_3",
        color: "jw_brown",
        assistantId: "school_2_assistant_3",
      });
    }
    if (data.mwb_ayf_part4_title) {
      parts.push({
        title: formatLabel(data.mwb_ayf_part4_title, data.mwb_ayf_part4_time),
        time: null,
        assignmentId: "school_2_apply_4",
        color: "jw_brown",
        assistantId: "school_2_assistant_4",
      });
    }
  }

  // School 3
  if (hasAssignment(assignments, "chairman_3")) {
    parts.push({
      title: "Chairman",
      time: null,
      assignmentId: "chairman_3",
      color: "medium",
    });
  }

  // School 3 content would go here when data is available

  // Living as Christians
  if (data.mwb_lc_part1_title) {
    parts.push({
      title: formatLabel(data.mwb_lc_part1_title, data.mwb_lc_part1_time),
      time: null,
      assignmentId: "living_1",
      color: "jw_red",
      pin_to_first_column: true,
    });
  }
  if (data.mwb_lc_part2_title) {
    parts.push({
      title: formatLabel(data.mwb_lc_part2_title, data.mwb_lc_part2_time),
      time: null,
      assignmentId: "living_2",
      color: "jw_red",
    });
  }
  if (data.mwb_lc_cbs_title && (!show_circuit_theme || can_edit)) {
    parts.push({
      title: data.mwb_lc_cbs_title,
      time: null,
      assignmentId: "cbs_conductor",
      color: "jw_red",
      assistantId: "cbs_reader",
    });
  }
  if (show_circuit_theme && circuit_visit) {
    parts.push({
      title: circuit_visit.theme,
      time: null,
      assignmentId: "circuit_visit_theme",
      color: "jw_red",
      publisher_override: circuit_visit.overseer_name,
      is_read_only: true,
    });
  }

  // Closing
  if (!show_circuit_theme || can_edit) {
    parts.push({
      title: "Closing Prayer",
      time: null,
      assignmentId: "prayer_2",
      color: "medium",
      pin_to_first_column: true,
    });
  }

  return parts;
}
