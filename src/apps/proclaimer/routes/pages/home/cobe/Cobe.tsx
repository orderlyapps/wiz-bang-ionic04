import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CobeHeader } from "@proclaimer-content/pages/home/cobe/cobe-header/CobeHeader";
import { CobeContent } from "@proclaimer-content/pages/home/cobe/cobe-content/CobeContent";

function CobePage() {
  return (
    <IonPage>
      <IonHeader>
        <CobeHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <CobeContent />
      </IonContent>
    </IonPage>
  );
}

export default CobePage;
