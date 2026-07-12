import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import { makeCompositeKey } from "@shared/database/util/composite-key";

interface UseAssignmentHandlersProps {
  congregation_id: string | undefined;
  assignment_id: string;
  week_id: string;
  assignment: MidweekAssignment | undefined;
}

export function useAssignmentHandlers({
  congregation_id,
  assignment_id,
  week_id,
  assignment,
}: UseAssignmentHandlersProps) {
  const handleDelete = () => {
    if (!congregation_id || !assignment) return;
    const key = makeCompositeKey(assignment_id, congregation_id, week_id);
    midweekAssignmentCollection.delete(key);
  };

  const handleSelect = (publisher_id: string) => {
    if (!congregation_id) return;
    if (assignment) {
      const key = makeCompositeKey(assignment_id, congregation_id, week_id);
      midweekAssignmentCollection.update(key, (draft) => {
        draft.participant_id = publisher_id;
      });
    } else {
      midweekAssignmentCollection.insert({
        assignment_id: assignment_id as MidweekAssignment["assignment_id"],
        congregation_id,
        week_id,
        participant_id: publisher_id,
      });
    }
  };

  return { handleDelete, handleSelect };
}
