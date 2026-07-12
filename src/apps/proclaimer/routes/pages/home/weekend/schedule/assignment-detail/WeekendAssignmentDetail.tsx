import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { WeekendAssignmentDetailHeader } from "@proclaimer-content/pages/home/weekend/schedule/assignment-detail/assignment-detail-header/WeekendAssignmentDetailHeader";
import { WeekendAssignmentDetailContent } from "@proclaimer-content/pages/home/weekend/schedule/assignment-detail/assignment-detail-content/WeekendAssignmentDetailContent";

function WeekendAssignmentDetailPage() {
  const { week_id, assignment_id } = useParams<{ week_id: string; assignment_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <WeekendAssignmentDetailHeader
          title={getTheocraticWeekLabel(week_id)}
          back_href={`/home/weekend/schedule/${week_id}`}
        />
      </IonHeader>
      <WeekendAssignmentDetailContent week_id={week_id} assignment_id={assignment_id} />
    </IonPage>
  );
}

export default WeekendAssignmentDetailPage;
