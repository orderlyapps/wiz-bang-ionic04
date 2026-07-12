import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { AvScheduleHeader } from "@proclaimer-content/pages/home/av-overseer/schedule/schedule-header/ScheduleHeader";
import { AvScheduleContent } from "@proclaimer-content/pages/home/av-overseer/schedule/schedule-content/AvScheduleContent";

function AvSchedulePage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <AvScheduleHeader />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <AvScheduleContent week_id={week_id} base_path="/home/av-overseer/schedule" />
      </IonContent>
    </IonPage>
  );
}

export default AvSchedulePage;
