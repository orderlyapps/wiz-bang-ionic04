import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MinistryTimeHeader } from "@proclaimer-content/pages/home/ministry-time/ministry-time-header/MinistryTimeHeader";
import { MinistryTimeContent } from "@proclaimer-content/pages/home/ministry-time/ministry-time-content/MinistryTimeContent";

function MinistryTimePage() {
  return (
    <IonPage>
      <IonHeader>
        <MinistryTimeHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <MinistryTimeContent />
      </IonContent>
    </IonPage>
  );
}

export default MinistryTimePage;
