import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { WeekendMeetingHeader } from "@proclaimer-content/pages/home/reminders/weekend-meeting/weekend-meeting-header/WeekendMeetingHeader";
import { WeekendMeetingContent } from "@proclaimer-content/pages/home/reminders/weekend-meeting/weekend-meeting-content/WeekendMeetingContent";

function WeekendMeetingPage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <WeekendMeetingHeader />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <WeekendMeetingContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default WeekendMeetingPage;
