import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PdfsHeader } from "@proclaimer-content/pages/home/elder/pdfs/pdfs-header/PdfsHeader";
import { PdfsContent } from "@proclaimer-content/pages/home/elder/pdfs/pdfs-content/PdfsContent";

function PdfsPage() {
  return (
    <IonPage>
      <IonHeader>
        <PdfsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <PdfsContent />
      </IonContent>
    </IonPage>
  );
}

export default PdfsPage;
