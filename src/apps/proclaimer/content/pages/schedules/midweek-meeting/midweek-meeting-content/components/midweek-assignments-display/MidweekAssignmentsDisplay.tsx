import { useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { midweekAVAssignmentIDs, avAssignmentLabels } from "@shared/database/schemas/av-assignment";
import { and, eq, inArray } from "@tanstack/react-db";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";

type MidweekAssignmentsDisplayProps = {
  weekId: string;
};

export const MidweekAssignmentsDisplay: React.FC<MidweekAssignmentsDisplayProps> = ({ weekId }) => {
  const congregation = useStoredCongregation();
  const congregationId = congregation?.id;

  const { data: avAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ av: avAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ av, p }) => eq(av.participant_id, p!.id))
        .where(({ av }) =>
          and(
            eq(av.week_id, weekId),
            eq(av.congregation_id, congregationId ?? ""),
            inArray(av.assignment_id, [...midweekAVAssignmentIDs]),
          ),
        )
        .select(({ av, p }) => ({
          assignmentId: av.assignment_id,
          participantId: av.participant_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
        })),
    [weekId, congregationId],
  );

  return (
    <>
      {avAssignments && avAssignments.length > 0 ? (
        avAssignments.map((assignment, index) => {
          const participantName =
            assignment?.first_name && assignment?.last_name
              ? getPublisherDisplayName({
                  first_name: assignment.first_name,
                  last_name: assignment.last_name,
                  display_name: assignment.display_name,
                })
              : "Unassigned";

          return (
            <div key={index}>
              <LabelValueItem
                label={avAssignmentLabels[assignment.assignmentId] || assignment.assignmentId}
                label_color="primary"
                value={participantName}
              />
            </div>
          );
        })
      ) : (
        <LabelValueItem
          label="Midweek AV Assignments"
          value="No AV assignments for this week"
          value_color="medium"
        />
      )}
    </>
  );
};
