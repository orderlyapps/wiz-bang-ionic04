import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { AvAssignmentDetailHeader } from "@proclaimer-content/pages/home/av-overseer/schedule/assignment-detail/assignment-detail-header/AvAssignmentDetailHeader";
import { AvAssignmentDetailContent } from "@proclaimer-content/pages/home/av-overseer/schedule/assignment-detail/assignment-detail-content/AvAssignmentDetailContent";

function AvAssignmentDetailPage() {
  const { week_id, assignment_id } = useParams<{ week_id: string; assignment_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <AvAssignmentDetailHeader
          title={getTheocraticWeekLabel(week_id)}
          back_href={`/home/av-overseer/schedule/${week_id}`}
        />
      </IonHeader>
      <AvAssignmentDetailContent week_id={week_id} assignment_id={assignment_id} />
    </IonPage>
  );
}

export default AvAssignmentDetailPage;
