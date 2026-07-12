import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { ClamHeader } from "@proclaimer-content/pages/home/reminders/clam/clam-header/ClamHeader";
import { ClamContent } from "@proclaimer-content/pages/home/reminders/clam/clam-content/ClamContent";

function ClamPage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <ClamHeader />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <ClamContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default ClamPage;
