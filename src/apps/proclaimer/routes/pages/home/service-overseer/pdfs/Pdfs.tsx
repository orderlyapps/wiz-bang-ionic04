import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PdfsHeader } from "@proclaimer-content/pages/home/service-overseer/pdfs/pdfs-header/PdfsHeader";
import { PdfsContent } from "@proclaimer-content/pages/home/service-overseer/pdfs/pdfs-content/PdfsContent";

function PdfsPage() {
  return (
    <IonPage>
      <IonHeader>
        <PdfsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <PdfsContent />
      </IonContent>
    </IonPage>
  );
}

export default PdfsPage;
