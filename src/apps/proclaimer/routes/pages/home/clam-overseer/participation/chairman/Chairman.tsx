import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ChairmanHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/chairman/chairman-header/ChairmanHeader";
import { ChairmanContent } from "@proclaimer-content/pages/home/clam-overseer/participation/chairman/chairman-content/ChairmanContent";

function ChairmanPage() {
  return (
    <IonPage>
      <IonHeader>
        <ChairmanHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <ChairmanContent />
      </IonContent>
    </IonPage>
  );
}

export default ChairmanPage;
