import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CleaningScheduleHeader } from "@proclaimer-content/pages/home/elder/pdfs/cleaning-schedule/cleaning-schedule-header/CleaningScheduleHeader";
import { CleaningScheduleContent } from "@proclaimer-content/pages/home/elder/pdfs/cleaning-schedule/cleaning-schedule-content/CleaningScheduleContent";

function CleaningSchedulePage() {
  return (
    <IonPage>
      <IonHeader>
        <CleaningScheduleHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <CleaningScheduleContent />
      </IonContent>
    </IonPage>
  );
}

export default CleaningSchedulePage;
