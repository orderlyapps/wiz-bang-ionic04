import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ParticipantsHeader } from "@proclaimer-content/pages/home/av-overseer/participants/participants-header/ParticipantsHeader";
import { ParticipantsContent } from "@proclaimer-content/pages/home/av-overseer/participants/participants-content/ParticipantsContent";

function ParticipantsPage() {
  return (
    <IonPage>
      <IonHeader>
        <ParticipantsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <ParticipantsContent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipantsPage;
