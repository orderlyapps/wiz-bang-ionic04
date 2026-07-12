import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CbsReaderHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/cbs-reader/cbs-reader-header/CbsReaderHeader";
import { CbsReaderContent } from "@proclaimer-content/pages/home/clam-overseer/participation/cbs-reader/cbs-reader-content/CbsReaderContent";

function CbsReaderPage() {
  return (
    <IonPage>
      <IonHeader>
        <CbsReaderHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <CbsReaderContent />
      </IonContent>
    </IonPage>
  );
}

export default CbsReaderPage;
