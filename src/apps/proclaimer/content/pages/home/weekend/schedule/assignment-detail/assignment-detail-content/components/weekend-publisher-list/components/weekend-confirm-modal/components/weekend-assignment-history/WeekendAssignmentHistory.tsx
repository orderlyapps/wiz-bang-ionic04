import { IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import { buildWeekendHistoryRows } from "./utils/build-weekend-history-rows";

interface WeekendAssignmentHistoryProps {
  publisher_id: string;
  week_id: string;
  weekend_assignments: WeekendAssignment[];
  speaker_assignments: SpeakerAssignment[];
  av_assignments: AvAssignment[];
}

export function WeekendAssignmentHistory({
  publisher_id,
  week_id,
  weekend_assignments,
  speaker_assignments,
  av_assignments,
}: WeekendAssignmentHistoryProps) {
  const rows = buildWeekendHistoryRows(
    publisher_id,
    week_id,
    weekend_assignments,
    speaker_assignments,
    av_assignments,
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
            key={`${row.week_id}-${row.assignment_label}-${i}`}
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
