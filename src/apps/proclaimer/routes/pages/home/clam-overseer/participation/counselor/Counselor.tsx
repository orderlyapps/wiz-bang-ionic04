import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CounselorHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/counselor/counselor-header/CounselorHeader";
import { CounselorContent } from "@proclaimer-content/pages/home/clam-overseer/participation/counselor/counselor-content/CounselorContent";

function CounselorPage() {
  return (
    <IonPage>
      <IonHeader>
        <CounselorHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <CounselorContent />
      </IonContent>
    </IonPage>
  );
}

export default CounselorPage;
