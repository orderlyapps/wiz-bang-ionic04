import { IonContent, IonHeader, IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Space } from "@ui/components/layout/space/Space";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { useAvAssignmentData } from "./hooks/use-av-assignment-data";
import { useAvAssignmentHandlers } from "./hooks/use-av-assignment-handlers";
import { AvAssignedPublisher } from "./components/av-assigned-publisher/AvAssignedPublisher";
import { AvPublisherSelector } from "./components/av-publisher-selector/AvPublisherSelector";
import type { AvAssignmentID } from "@shared/database/schemas/av-assignment";

interface AvAssignmentDetailContentProps {
  week_id: string;
  assignment_id: string;
}

export function AvAssignmentDetailContent({
  week_id,
  assignment_id,
}: AvAssignmentDetailContentProps) {
  const { congregation_id, assignment, publishers, assignee, assignmentTitle, isLoading } =
    useAvAssignmentData({ week_id, assignment_id });

  const { handleDelete, handleSelect } = useAvAssignmentHandlers({
    congregation_id,
    assignment_id,
    week_id,
    assignment,
  });

  if (isLoading) {
    return <Spinner centered />;
  }

  return (
    <>
      <IonHeader>
        <IonList>
          <LabelValueItem label={assignmentTitle} />
        </IonList>
        <AvAssignedPublisher label="Assigned" assignee={assignee} on_delete={handleDelete} />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding remove-bottom-padding">
        <Space />
        <AvPublisherSelector
          publishers={publishers}
          assignment={assignment}
          assignment_id={assignment_id as AvAssignmentID}
          week_id={week_id}
          on_select={handleSelect}
        />
      </IonContent>
    </>
  );
}
