import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { ClamChairmanHeader } from "@proclaimer-content/pages/home/clam-chairman/clam-chairman-header/ClamChairmanHeader";
import { ClamChairmanContent } from "@proclaimer-content/pages/home/clam-chairman/clam-chairman-content/ClamChairmanContent";

function ClamChairmanPage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <ClamChairmanHeader week_id={week_id} />
      </IonHeader>
      <IonContent className="content-wide">
        <ClamChairmanContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default ClamChairmanPage;
