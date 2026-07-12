import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";

export function getAssignmentContext(id: string, data: MidweekMeetingData): string | undefined {
  if (
    id === "school_1_bible_reading" ||
    id === "school_2_bible_reading" ||
    id === "school_3_bible_reading"
  ) {
    return data.mwb_tgw_bread ?? undefined;
  }
  const applyMatch = id.match(/^school_\d_apply_(\d)$/) ?? id.match(/^school_\d_assistant_(\d)$/);
  if (applyMatch) {
    const n = applyMatch[1] as "1" | "2" | "3" | "4";
    return (data[`mwb_ayf_part${n}`] as string | undefined | null) ?? undefined;
  }
  if (id === "living_1") return data.mwb_lc_part1_content ?? undefined;
  if (id === "living_2") return data.mwb_lc_part2_content ?? undefined;
  if (id === "cbs_conductor" || id === "cbs_reader") return data.mwb_lc_cbs ?? undefined;
  return undefined;
}
