import { NetworkContent } from "@base-content/pages/settings/info/util/app/network/network-content/NetworkContent";
import { NetworkHeader } from "@base-content/pages/settings/info/util/app/network/network-header/NetworkHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function NetworkPage() {
  return (
    <IonPage>
      <IonHeader>
        <NetworkHeader />
      </IonHeader>
      <IonContent>
        <NetworkContent />
      </IonContent>
    </IonPage>
  );
}

export default NetworkPage;
