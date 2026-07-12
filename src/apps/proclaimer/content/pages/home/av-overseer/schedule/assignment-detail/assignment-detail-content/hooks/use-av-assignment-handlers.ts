import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import type { AvAssignmentID } from "@shared/database/schemas/av-assignment";
import { makeCompositeKey } from "@shared/database/util/composite-key";

interface UseAvAssignmentHandlersProps {
  congregation_id: string | undefined;
  assignment_id: string;
  week_id: string;
  assignment: AvAssignment | undefined;
}

export function useAvAssignmentHandlers({
  congregation_id,
  assignment_id,
  week_id,
  assignment,
}: UseAvAssignmentHandlersProps) {
  const handleDelete = () => {
    if (!congregation_id || !assignment) return;
    const key = makeCompositeKey(assignment_id, congregation_id, week_id);
    avAssignmentCollection.delete(key);
  };

  const handleSelect = (publisher_id: string) => {
    if (!congregation_id) return;
    if (assignment) {
      const key = makeCompositeKey(assignment_id, congregation_id, week_id);
      avAssignmentCollection.update(key, (draft) => {
        draft.participant_id = publisher_id;
      });
    } else {
      avAssignmentCollection.insert({
        assignment_id: assignment_id as AvAssignmentID,
        congregation_id,
        week_id,
        participant_id: publisher_id,
      });
    }
  };

  return { handleDelete, handleSelect };
}
