import { useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import {
  midweekAttendantAssignmentIDs,
  avAssignmentLabels,
} from "@shared/database/schemas/av-assignment";
import { and, eq, inArray } from "@tanstack/react-db";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";

type MidweekAttendantsDisplayProps = {
  weekId: string;
};

export const MidweekAttendantsDisplay: React.FC<MidweekAttendantsDisplayProps> = ({ weekId }) => {
  const congregation = useStoredCongregation();
  const congregationId = congregation?.id;

  const { data: attendantAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ av: avAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ av, p }) => eq(av.participant_id, p!.id))
        .where(({ av }) =>
          and(
            eq(av.week_id, weekId),
            eq(av.congregation_id, congregationId ?? ""),
            inArray(av.assignment_id, [...midweekAttendantAssignmentIDs]),
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
      {attendantAssignments && attendantAssignments.length > 0 ? (
        attendantAssignments.map((assignment, index) => {
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
                label_color="jw_red"
                value={participantName}
              />
            </div>
          );
        })
      ) : (
        <LabelValueItem
          label="Midweek Attendants"
          value="No attendant assignments for this week"
          value_color="medium"
        />
      )}
    </>
  );
};
