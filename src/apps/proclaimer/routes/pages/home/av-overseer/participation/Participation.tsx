import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AvParticipationHeader } from "@proclaimer-content/pages/home/av-overseer/participation/participation-header/AvParticipationHeader";
import { AvParticipationContent } from "@proclaimer-content/pages/home/av-overseer/participation/participation-content/AvParticipationContent";

function ParticipationPage() {
  return (
    <IonPage>
      <IonHeader>
        <AvParticipationHeader />
      </IonHeader>
      <IonContent>
        <AvParticipationContent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipationPage;
