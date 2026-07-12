import { IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { AvAssignment, AvAssignmentID } from "@shared/database/schemas/av-assignment";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import { buildHistoryRows, type AssignmentRow } from "./utils/build-history-rows";

interface AvAssignmentHistoryProps {
  publisher_id: string;
  week_id: string;
  assignment_id: AvAssignmentID;
  all_assignments: AvAssignment[];
  midweek_assignments: MidweekAssignment[];
  weekend_assignments: WeekendAssignment[];
  speaker_assignments: SpeakerAssignment[];
}

export function AvAssignmentHistory({
  publisher_id,
  week_id,
  assignment_id,
  all_assignments,
  midweek_assignments,
  weekend_assignments,
  speaker_assignments,
}: AvAssignmentHistoryProps) {
  const rows: AssignmentRow[] = buildHistoryRows(
    publisher_id,
    week_id,
    assignment_id,
    all_assignments,
    midweek_assignments,
    weekend_assignments,
    speaker_assignments,
  );

  if (rows.length === 0) return null;

  return (
    <IonList inset>
      {rows.map((row, i) => {
        const weeks_label = row.is_current
          ? "This week"
          : row.is_future
            ? `In ${row.weeks_away}w`
            : `${row.weeks_away}w ago`;

        return (
          <LabelValueItem
            key={`${row.week_id}-${row.assignment_label}-${row.meeting_label}-${i}`}
            label={weeks_label}
            label_size={row.is_current ? "xl" : undefined}
            label_color={row.is_current ? "primary" : undefined}
            value={`${row.assignment_label} (${row.meeting_label})`}
          />
        );
      })}
    </IonList>
  );
}
