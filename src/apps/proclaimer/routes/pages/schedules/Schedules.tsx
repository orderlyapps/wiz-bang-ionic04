import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SchedulesHeader } from "@proclaimer-content/pages/schedules/schedules-header/SchedulesHeader";
import { SchedulesContent } from "@proclaimer-content/pages/schedules/schedules-content/SchedulesContent";

function SchedulesPage() {
  return (
    <IonPage>
      <IonHeader>
        <SchedulesHeader />
      </IonHeader>
      <IonContent>
        <SchedulesContent />
      </IonContent>
    </IonPage>
  );
}

export default SchedulesPage;
