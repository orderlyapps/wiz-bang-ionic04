import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamChairmanHeader } from "@proclaimer-content/pages/home/clam-chairman/clam-chairman-header/ClamChairmanHeader";
import { ClamChairmanContent } from "@proclaimer-content/pages/home/clam-chairman/clam-chairman-content/ClamChairmanContent";

function ClamChairmanPage() {
  return (
    <IonPage>
      <IonHeader>
        <ClamChairmanHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <ClamChairmanContent />
      </IonContent>
    </IonPage>
  );
}

export default ClamChairmanPage;
