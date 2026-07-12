import { IonContent, IonHeader, IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Space } from "@ui/components/layout/space/Space";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { useWeekendAssignmentData } from "./hooks/useWeekendAssignmentData";
import { useWeekendAssignmentHandlers } from "./hooks/useWeekendAssignmentHandlers";
import { WeekendAssignedPublisher } from "./components/weekend-assigned-publisher/WeekendAssignedPublisher";
import { WeekendPublisherList } from "./components/weekend-publisher-list/WeekendPublisherList";

interface WeekendAssignmentDetailContentProps {
  week_id: string;
  assignment_id: string;
}

export function WeekendAssignmentDetailContent({
  week_id,
  assignment_id,
}: WeekendAssignmentDetailContentProps) {
  const { congregation_id, assignment, publishers, assignee, assignmentTitle, isLoading } =
    useWeekendAssignmentData({ week_id, assignment_id });

  const { handleDelete, handleSelect } = useWeekendAssignmentHandlers({
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
        <WeekendAssignedPublisher label="Assigned" assignee={assignee} on_delete={handleDelete} />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding remove-bottom-padding">
        <Space />
        <WeekendPublisherList
          publishers={publishers}
          selected_id={assignment?.participant_id}
          week_id={week_id}
          assignment_id={assignment_id}
          on_select={handleSelect}
        />
      </IonContent>
    </>
  );
}
