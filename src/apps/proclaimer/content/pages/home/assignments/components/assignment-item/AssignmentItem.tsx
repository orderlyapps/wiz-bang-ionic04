import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { getMidweekMeetingUrl } from "@proclaimer-shared/util/date/getMidweekMeetingUrl";
import type { Assignment } from "../../useAssignments";

interface AssignmentItemProps {
  assignment: Assignment;
}

export function AssignmentItem({ assignment }: AssignmentItemProps) {
  const isMidweek = assignment.type === "midweek";
  const url = isMidweek ? getMidweekMeetingUrl(assignment.week_id) : undefined;

  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(assignment.week_id, {
        format: "week-range",
        useRelativeWeek: true,
        relativeWeekStyle: "append",
      })}
      value={assignment.label}
      detail={isMidweek}
      on_click={url ? () => window.open(url, "_blank", "noopener,noreferrer") : undefined}
    />
  );
}
