import { PwaContent } from "@base-content/pages/settings/info/util/app/pwa/pwa-content/PwaContent";
import { PwaHeader } from "@base-content/pages/settings/info/util/app/pwa/pwa-header/PwaHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function PwaPage() {
  return (
    <IonPage>
      <IonHeader>
        <PwaHeader />
      </IonHeader>
      <IonContent>
        <PwaContent />
      </IonContent>
    </IonPage>
  );
}

export default PwaPage;
