import { ClamAssignmentItem } from "../clam-assignment-item/ClamAssignmentItem";
import type { MidweekAssignmentId } from "@shared/database/schemas/midweek-assignment";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { Publisher } from "@shared/database/schemas/publisher";

type PartConfig = {
  suffix: string;
  label: (meeting: MidweekMeetingData) => string | null | undefined;
  material: (meeting: MidweekMeetingData) => string | null | undefined;
};

const parts: PartConfig[] = [
  {
    suffix: "bible_reading",
    label: (m) => m.mwb_tgw_bread_title,
    material: (m) => m.mwb_tgw_bread,
  },
  { suffix: "apply_1", label: (m) => m.mwb_ayf_part1_title, material: (m) => m.mwb_ayf_part1 },
  { suffix: "apply_2", label: (m) => m.mwb_ayf_part2_title, material: (m) => m.mwb_ayf_part2 },
  { suffix: "apply_3", label: (m) => m.mwb_ayf_part3_title, material: (m) => m.mwb_ayf_part3 },
  { suffix: "apply_4", label: (m) => m.mwb_ayf_part4_title, material: (m) => m.mwb_ayf_part4 },
];

type ClamAssignmentSchoolProps = {
  week_label: string;
  school_key: string;
  school_label: string;
  chairman_id: MidweekAssignmentId;
  meeting: MidweekMeetingData;
  participant: (assignment_id: MidweekAssignmentId) => Publisher | undefined;
};

export function ClamAssignmentSchool({
  week_label,
  school_key,
  school_label,
  chairman_id,
  meeting,
  participant,
}: ClamAssignmentSchoolProps) {
  const counselor = participant(chairman_id);

  return (
    <div>
      {parts.map((part) => {
        const assignment_id = `${school_key}_${part.suffix}` as MidweekAssignmentId;
        const label = part.label(meeting);
        const material = part.material(meeting);
        const student = participant(assignment_id);

        if (!label || !student) {
          return null;
        }

        const assistant_id = part.suffix.startsWith("apply")
          ? (`${school_key}_${part.suffix.replace("apply", "assistant")}` as MidweekAssignmentId)
          : undefined;

        return (
          <ClamAssignmentItem
            key={assignment_id}
            week_label={week_label}
            school={school_label}
            label={label}
            material={material ?? ""}
            student={student}
            assistant={assistant_id ? participant(assistant_id) : undefined}
            counselor={counselor}
            filename={`assignment-${student.last_name || "unknown"}-${assignment_id}`}
          />
        );
      })}
    </div>
  );
}
