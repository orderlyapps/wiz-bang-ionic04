import { Spinner } from "@ui/components/display/spinner/Spinner";
import { AssignmentInfo } from "./components/assignment-info/AssignmentInfo";
import { AssignedPublishers } from "./components/assigned-publishers/AssignedPublishers";
import { PublisherSelector } from "./components/publisher-selector/PublisherSelector";
import { useAssignmentData } from "./hooks/use-assignment-data";
import { useAssignmentHandlers } from "./hooks/use-assignment-handlers";
import { useAssistantHandlers } from "./hooks/use-assistant-handlers";
import { IonContent, IonHeader } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";

interface AssignmentDetailContentProps {
  week_id: string;
  assignment_id: string;
}

export function AssignmentDetailContent({ week_id, assignment_id }: AssignmentDetailContentProps) {
  const {
    congregation_id,
    assignment,
    publishers,
    assignee,
    assigneeLabel,
    assistantId,
    assistantAssignment,
    assistantAssignee,
    isLoading,
    assignmentTitle,
    assignmentColor,
    assignmentContext,
  } = useAssignmentData({ week_id, assignment_id });

  const { handleDelete, handleSelect } = useAssignmentHandlers({
    congregation_id,
    assignment_id,
    week_id,
    assignment,
  });

  const { handleDeleteAssistant, handleSelectAssistant } = useAssistantHandlers({
    congregation_id,
    assistantId,
    week_id,
    assistantAssignment,
  });

  if (isLoading) {
    return <Spinner centered />;
  }

  return (
    <>
      <IonHeader>
        <AssignmentInfo
          title={assignmentTitle}
          color={assignmentColor}
          context={assignmentContext}
        />

        <AssignedPublishers
          assignee={assignee}
          assigneeLabel={assigneeLabel}
          onDeleteAssignee={handleDelete}
          assistantId={assistantId}
          assistantAssignee={assistantAssignee}
          onDeleteAssistant={handleDeleteAssistant}
        />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding remove-bottom-padding">
        <Space />
        <PublisherSelector
          publishers={publishers}
          assignment={assignment}
          assistantId={assistantId}
          assistantAssignment={assistantAssignment}
          onSelectAssignee={handleSelect}
          onSelectAssistant={handleSelectAssistant}
          onClearAssignee={handleDelete}
          onClearAssistant={handleDeleteAssistant}
          assignment_id={assignment_id}
          week_id={week_id}
        />
      </IonContent>
    </>
  );
}
