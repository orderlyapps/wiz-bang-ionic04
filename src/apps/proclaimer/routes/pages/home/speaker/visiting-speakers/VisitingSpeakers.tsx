import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { VisitingSpeakersHeader } from "@proclaimer-content/pages/home/speaker/visiting-speakers/visiting-speakers-header/VisitingSpeakersHeader";
import { VisitingSpeakersContent } from "@proclaimer-content/pages/home/speaker/visiting-speakers/visiting-speakers-content/VisitingSpeakersContent";

function VisitingSpeakersPage() {
  return (
    <IonPage>
      <IonHeader>
        <VisitingSpeakersHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <VisitingSpeakersContent />
      </IonContent>
    </IonPage>
  );
}

export default VisitingSpeakersPage;
