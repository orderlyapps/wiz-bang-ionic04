import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SpeakerHeader } from "@proclaimer-content/pages/home/speaker/speaker-header/SpeakerHeader";
import { SpeakerContent } from "@proclaimer-content/pages/home/speaker/speaker-content/SpeakerContent";

function SpeakerPage() {
  return (
    <IonPage>
      <IonHeader>
        <SpeakerHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <SpeakerContent />
      </IonContent>
    </IonPage>
  );
}

export default SpeakerPage;
