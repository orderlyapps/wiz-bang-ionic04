import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ApplyHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/apply/apply-header/ApplyHeader";
import { ApplyContent } from "@proclaimer-content/pages/home/clam-overseer/participation/apply/apply-content/ApplyContent";

function ApplyPage() {
  return (
    <IonPage>
      <IonHeader>
        <ApplyHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <ApplyContent />
      </IonContent>
    </IonPage>
  );
}

export default ApplyPage;
