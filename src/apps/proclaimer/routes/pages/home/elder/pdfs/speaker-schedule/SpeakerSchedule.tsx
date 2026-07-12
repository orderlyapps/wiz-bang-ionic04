import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SpeakerScheduleHeader } from "@proclaimer-content/pages/home/elder/pdfs/speaker-schedule/speaker-schedule-header/SpeakerScheduleHeader";
import { SpeakerScheduleContent } from "@proclaimer-content/pages/home/elder/pdfs/speaker-schedule/speaker-schedule-content/SpeakerScheduleContent";

function SpeakerSchedulePage() {
  return (
    <IonPage>
      <IonHeader>
        <SpeakerScheduleHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <SpeakerScheduleContent />
      </IonContent>
    </IonPage>
  );
}

export default SpeakerSchedulePage;
