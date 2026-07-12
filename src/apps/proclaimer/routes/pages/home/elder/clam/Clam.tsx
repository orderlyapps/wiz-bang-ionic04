import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamHeader } from "@proclaimer-content/pages/home/elder/pdfs/clam/clam-header/ClamHeader";
import { ClamContent } from "@proclaimer-content/pages/home/elder/pdfs/clam/clam-content/ClamContent";

function ClamPage() {
  return (
    <IonPage>
      <IonHeader>
        <ClamHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ClamContent />
      </IonContent>
    </IonPage>
  );
}

export default ClamPage;
