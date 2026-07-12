import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { GemsHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/gems/gems-header/GemsHeader";
import { GemsContent } from "@proclaimer-content/pages/home/clam-overseer/participation/gems/gems-content/GemsContent";

function GemsPage() {
  return (
    <IonPage>
      <IonHeader>
        <GemsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <GemsContent />
      </IonContent>
    </IonPage>
  );
}

export default GemsPage;
