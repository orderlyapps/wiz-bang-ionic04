import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamDataHeader } from "@proclaimer-content/pages/home/super-admin/clam-data-header/ClamDataHeader";
import { ClamDataContent } from "@proclaimer-content/pages/home/super-admin/clam-data-content/ClamDataContent";

function ClamDataPage() {
  return (
    <IonPage>
      <IonHeader>
        <ClamDataHeader />
      </IonHeader>
      <IonContent>
        <ClamDataContent />
      </IonContent>
    </IonPage>
  );
}

export default ClamDataPage;
