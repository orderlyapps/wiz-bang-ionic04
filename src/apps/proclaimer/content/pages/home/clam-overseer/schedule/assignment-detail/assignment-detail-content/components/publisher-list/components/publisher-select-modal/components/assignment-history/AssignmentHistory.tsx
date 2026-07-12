import { IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { differenceInWeeks, parseISO } from "date-fns";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { participationTypeMap } from "../../../../../publisher-selector/utils/participationTypeMap";

interface AssignmentHistoryProps {
  publisher_id: string;
  week_id: string;
  all_assignments: MidweekAssignment[];
  publishers: Publisher[];
}

interface AssignmentRow {
  week_id: string;
  assignment_id: string;
  weeks_away: number;
  is_future: boolean;
  is_current: boolean;
  assistant_name: string | null;
}

function getAssignmentTypeLabel(assignment_id: string): string {
  const type = participationTypeMap[assignment_id as keyof typeof participationTypeMap];
  if (!type) return assignment_id.replace(/_/g, " ");
  return type.replace(/_/g, " ");
}

function getAssistantId(assignment_id: string): string | null {
  const match = assignment_id.match(/^(school_\d)_apply_(\d)$/);
  if (match) return `${match[1]}_assistant_${match[2]}`;
  if (assignment_id === "cbs_conductor") return "cbs_reader";
  return null;
}

export function AssignmentHistory({
  publisher_id,
  week_id,
  all_assignments,
  publishers,
}: AssignmentHistoryProps) {
  const current_date = parseISO(week_id);

  const publisher_assignments = all_assignments.filter((a) => a.participant_id === publisher_id);

  const past = publisher_assignments
    .filter((a) => a.week_id < week_id)
    .sort((a, b) => b.week_id.localeCompare(a.week_id))
    .slice(0, 5);

  const current = publisher_assignments.filter((a) => a.week_id === week_id);

  const future = publisher_assignments
    .filter((a) => a.week_id > week_id)
    .sort((a, b) => a.week_id.localeCompare(b.week_id));

  const rows: AssignmentRow[] = [...past.reverse(), ...current, ...future].map((a) => {
    const a_date = parseISO(a.week_id);
    const diff = differenceInWeeks(a_date, current_date);
    const is_current = a.week_id === week_id;
    const is_future = a.week_id > week_id;

    const assistant_assignment_id = getAssistantId(a.assignment_id);
    let assistant_name: string | null = null;
    if (assistant_assignment_id) {
      const assistant_record = all_assignments.find(
        (x) => x.week_id === a.week_id && x.assignment_id === assistant_assignment_id,
      );
      if (assistant_record) {
        const assistant_publisher = publishers.find(
          (p) => p.id === assistant_record.participant_id,
        );
        if (assistant_publisher) {
          assistant_name = `${assistant_publisher.first_name} ${assistant_publisher.last_name}`;
        }
      }
    }

    return {
      week_id: a.week_id,
      assignment_id: a.assignment_id,
      weeks_away: Math.abs(diff),
      is_future,
      is_current,
      assistant_name,
    };
  });

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
            key={`${row.week_id}-${row.assignment_id}-${i}`}
            label={weeks_label}
            label_size={row.is_current ? "xl" : undefined}
            label_color={row.is_current ? "primary" : undefined}
            value={
              getAssignmentTypeLabel(row.assignment_id).replace(/\b\w/g, (c) => c.toUpperCase()) +
              `${row.assistant_name ? ` with ${row.assistant_name}` : ""}`
            }
          />
        );
      })}
    </IonList>
  );
}
