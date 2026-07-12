import { useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { and, eq } from "@tanstack/react-db";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";

type WeekendAssignmentsOtherDisplayProps = {
  weekId: string;
};

export const WeekendAssignmentsOtherDisplay: React.FC<WeekendAssignmentsOtherDisplayProps> = ({
  weekId,
}) => {
  const congregation = useStoredCongregation();
  const congregationId = congregation?.id;

  const { data: weekendAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ wa: weekendAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ wa, p }) => eq(wa.participant_id, p!.id))
        .where(({ wa }) =>
          and(eq(wa.week_id, weekId), eq(wa.congregation_id, congregationId ?? "")),
        )
        .select(({ wa, p }) => ({
          assignmentId: wa.assignment_id,
          participantId: wa.participant_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
        })),
    [weekId, congregationId],
  );

  return (
    <>
      {weekendAssignments && weekendAssignments.length > 0 ? (
        weekendAssignments.map((assignment, index) => {
          const participantName =
            assignment?.first_name && assignment?.last_name
              ? getPublisherDisplayName({
                  first_name: assignment.first_name,
                  last_name: assignment.last_name,
                  display_name: assignment.display_name,
                })
              : "Unassigned";

          // Format assignment ID for display
          const formatAssignmentName = (assignmentId: string) => {
            return assignmentId.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
          };

          return (
            <div key={index}>
              <LabelValueItem
                label={formatAssignmentName(assignment.assignmentId)}
                label_color="medium"
                value={participantName}
              />
            </div>
          );
        })
      ) : (
        <LabelValueItem
          label="Weekend Assignments"
          value="No other assignments for this week"
          value_color="medium"
        />
      )}
    </>
  );
};
