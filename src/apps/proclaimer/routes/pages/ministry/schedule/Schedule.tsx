import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ScheduleHeader } from "@proclaimer-content/pages/ministry/schedule/schedule-header/ScheduleHeader";
import { ScheduleContent } from "@proclaimer-content/pages/ministry/schedule/schedule-content/ScheduleContent";

function SchedulePage() {
  return (
    <IonPage>
      <IonHeader>
        <ScheduleHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ScheduleContent />
      </IonContent>
    </IonPage>
  );
}

export default SchedulePage;
