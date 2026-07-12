import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamOverseerHeader } from "@proclaimer-content/pages/home/clam-overseer/clam-overseer-header/ClamOverseerHeader";
import { ClamOverseerContent } from "@proclaimer-content/pages/home/clam-overseer/clam-overseer-content/ClamOverseerContent";

function ClamOverseerPage() {
  return (
    <IonPage>
      <IonHeader>
        <ClamOverseerHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ClamOverseerContent />
      </IonContent>
    </IonPage>
  );
}

export default ClamOverseerPage;
