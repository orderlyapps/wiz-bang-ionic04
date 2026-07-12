import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MinistryHeader } from "@proclaimer-content/pages/ministry/ministry-header/MinistryHeader";
import { MinistryContent } from "@proclaimer-content/pages/ministry/ministry-content/MinistryContent";

function MinistryPage() {
  return (
    <IonPage>
      <IonHeader>
        <MinistryHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <MinistryContent />
      </IonContent>
    </IonPage>
  );
}

export default MinistryPage;
