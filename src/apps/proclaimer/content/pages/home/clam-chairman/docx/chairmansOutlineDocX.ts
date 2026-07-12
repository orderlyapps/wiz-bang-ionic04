import { AlignmentType, type TableCell } from "docx";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { JW_BROWN, JW_RED, JW_SLATE } from "@ui/colors/jwColors";
import { getMeetingParts } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/get-meeting-parts";
import { hasAssignment } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/has-assignment";
import { document, paragraph, text, table, row, cell, sectionHeading, title } from "./primitives";

const colorMap: Record<string, string> = {
  jw_slate: JW_SLATE.light.base,
  jw_brown: JW_BROWN.light.base,
  jw_red: JW_RED.light.base,
  medium: "#666666",
};

const outlineAssignments = [
  "chairman_1",
  "prayer_1",
  "treasures",
  "gems",
  "school_1_bible_reading",
  "school_1_apply_1",
  "school_1_apply_2",
  "school_1_apply_3",
  "school_1_apply_4",
  "living_1",
  "living_2",
  "cbs_conductor",
  "prayer_2",
] as const;

function getPublisherName(
  assignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
  assignmentId: string,
): string {
  const assignment = assignments?.find((a) => a.assignment_id === assignmentId);
  if (!assignment) return "";
  const publisher = publishers?.find((p) => p.id === assignment.participant_id);
  return publisher ? getPublisherDisplayName(publisher, "first_last") : "";
}

function getAssistantName(
  assignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
  assistantId: string | undefined,
): string {
  if (!assistantId) return "";
  return getPublisherName(assignments, publishers, assistantId);
}

function assignmentRow(
  assignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
  part: { title: string; assignmentId: string; color: string; assistantId?: string },
) {
  const publisherName = getPublisherName(assignments, publishers, part.assignmentId);
  const assistantName = getAssistantName(assignments, publishers, part.assistantId);
  const color = colorMap[part.color] ?? "#666666";

  return row([
    cell([paragraph([text(part.title, { bold: true, color })]), paragraph([text("")])], 140),
    cell(
      [
        paragraph([text(publisherName, { bold: true })], { alignment: AlignmentType.END }),
        paragraph([text(assistantName, { color: "#666666" })], { alignment: AlignmentType.END }),
      ],
      47,
    ),
    cell([paragraph("")], 13),
  ]);
}

function nextWeekAssignments(
  nextMeetingData: MidweekMeetingData | undefined,
  nextAssignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
) {
  if (!nextMeetingData) {
    return [row([cell([paragraph("No assignments for next week")])])];
  }

  const show_school_2 = hasAssignment(nextAssignments, "chairman_2");
  const parts = getMeetingParts(nextMeetingData, nextAssignments, show_school_2);
  const schoolParts = parts.filter(
    (p) => p.assignmentId.includes("bible_reading") || p.assignmentId.includes("apply"),
  );

  if (schoolParts.length === 0) {
    return [row([cell([paragraph("No assignments for next week")])])];
  }

  const school1Parts = schoolParts.filter((p) => p.assignmentId.startsWith("school_1"));
  const school2Parts = schoolParts.filter((p) => p.assignmentId.startsWith("school_2"));

  const schools: TableCell[] = [];

  schools.push(
    cell(
      [
        paragraph("MAIN HALL"),
        ...school1Parts.map((p) =>
          paragraph(getPublisherName(nextAssignments, publishers, p.assignmentId)),
        ),
      ],
      40,
    ),
  );

  if (show_school_2 && school2Parts.length > 0) {
    schools.push(
      cell(
        [
          paragraph("SECOND SCHOOL"),
          ...school2Parts.map((p) =>
            paragraph(getPublisherName(nextAssignments, publishers, p.assignmentId)),
          ),
        ],
        40,
      ),
    );
  }

  schools.push(cell([], 120));

  return [
    row([cell([paragraph([text("Next Week's Assignments", { bold: true })])])]),
    row(schools),
  ];
}

export function chairmansOutlineDocX(
  week_id: string,
  meetingData: MidweekMeetingData | undefined,
  assignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
  nextMeetingData: MidweekMeetingData | undefined,
  nextAssignments: MidweekAssignment[] | undefined,
) {
  if (!meetingData) return document([]);

  const show_school_2 = hasAssignment(assignments, "chairman_2");
  const parts = getMeetingParts(meetingData, assignments, show_school_2);
  const week_label = getTheocraticWeekLabel(week_id, { format: "week-range" });
  const chairmanName = getPublisherName(assignments, publishers, "chairman_1");

  const rows = [
    title(`Chairman's Outline | ${week_label} | ${chairmanName}`),
    ...outlineAssignments.flatMap((id) => {
      const part = parts.find((p) => p.assignmentId === id);
      if (!part) return [];

      if (id === "treasures") {
        return [
          sectionHeading([
            paragraph(
              [
                text("Treasures from God's Word", {
                  color: JW_SLATE.light.base,
                  bold: true,
                  size: 26,
                }),
              ],
              { alignment: AlignmentType.CENTER },
            ),
          ]),
          assignmentRow(assignments, publishers, part),
        ];
      }
      if (id === "school_1_apply_1") {
        return [
          sectionHeading([
            paragraph(
              [
                text("Apply Yourself to the Field Ministry", {
                  color: JW_BROWN.light.base,
                  bold: true,
                  size: 26,
                }),
              ],
              { alignment: AlignmentType.CENTER },
            ),
          ]),
          assignmentRow(assignments, publishers, part),
        ];
      }
      if (id === "living_1") {
        return [
          sectionHeading([
            paragraph(
              [text("Living as Christians", { color: JW_RED.light.base, bold: true, size: 26 })],
              { alignment: AlignmentType.CENTER },
            ),
          ]),
          assignmentRow(assignments, publishers, part),
        ];
      }

      return [assignmentRow(assignments, publishers, part)];
    }),
    sectionHeading([paragraph([text("Notes", { bold: true, size: 26 })])]),
    row([cell([])]),
    ...nextWeekAssignments(nextMeetingData, nextAssignments, publishers),
  ];

  return document([table(rows)]);
}
