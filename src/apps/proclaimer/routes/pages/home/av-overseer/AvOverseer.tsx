import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AvOverseerHeader } from "@proclaimer-content/pages/home/av-overseer/av-overseer-header/AvOverseerHeader";
import { AvOverseerContent } from "@proclaimer-content/pages/home/av-overseer/av-overseer-content/AvOverseerContent";

function AvOverseerPage() {
  return (
    <IonPage>
      <IonHeader>
        <AvOverseerHeader />
      </IonHeader>
      <IonContent>
        <AvOverseerContent />
      </IonContent>
    </IonPage>
  );
}

export default AvOverseerPage;
