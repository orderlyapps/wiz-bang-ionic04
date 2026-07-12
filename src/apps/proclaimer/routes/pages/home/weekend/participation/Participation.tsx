import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ParticipationHeader } from "@proclaimer-content/pages/home/weekend/participation/participation-header/ParticipationHeader";
import { ParticipationContent } from "@proclaimer-content/pages/home/weekend/participation/participation-content/ParticipationContent";

function WeekendParticipationPage() {
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

export default WeekendParticipationPage;
