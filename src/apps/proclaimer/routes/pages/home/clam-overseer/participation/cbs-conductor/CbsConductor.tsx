import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CbsConductorHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/cbs-conductor/cbs-conductor-header/CbsConductorHeader";
import { CbsConductorContent } from "@proclaimer-content/pages/home/clam-overseer/participation/cbs-conductor/cbs-conductor-content/CbsConductorContent";

function CbsConductorPage() {
  return (
    <IonPage>
      <IonHeader>
        <CbsConductorHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <CbsConductorContent />
      </IonContent>
    </IonPage>
  );
}

export default CbsConductorPage;
