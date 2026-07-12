import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import { makeCompositeKey } from "@shared/database/util/composite-key";

interface UseAssistantHandlersProps {
  congregation_id: string | undefined;
  assistantId: string | undefined;
  week_id: string;
  assistantAssignment: MidweekAssignment | undefined;
}

export function useAssistantHandlers({
  congregation_id,
  assistantId,
  week_id,
  assistantAssignment,
}: UseAssistantHandlersProps) {
  const handleDeleteAssistant = () => {
    if (!congregation_id || !assistantId || !assistantAssignment) return;
    const key = makeCompositeKey(assistantId, congregation_id, week_id);
    midweekAssignmentCollection.delete(key);
  };

  const handleSelectAssistant = (publisher_id: string) => {
    if (!congregation_id || !assistantId) return;
    if (assistantAssignment) {
      const key = makeCompositeKey(assistantId, congregation_id, week_id);
      midweekAssignmentCollection.update(key, (draft) => {
        draft.participant_id = publisher_id;
      });
    } else {
      midweekAssignmentCollection.insert({
        assignment_id: assistantId as MidweekAssignment["assignment_id"],
        congregation_id,
        week_id,
        participant_id: publisher_id,
      });
    }
  };

  return { handleDeleteAssistant, handleSelectAssistant };
}
