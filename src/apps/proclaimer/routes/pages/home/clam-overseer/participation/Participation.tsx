import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ParticipationHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/participation-header/ParticipationHeader";
import { ParticipationContent } from "@proclaimer-content/pages/home/clam-overseer/participation/participation-content/ParticipationContent";

function ParticipationPage() {
  return (
    <IonPage>
      <IonHeader>
        <ParticipationHeader />
      </IonHeader>
      <IonContent>
        <ParticipationContent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipationPage;
