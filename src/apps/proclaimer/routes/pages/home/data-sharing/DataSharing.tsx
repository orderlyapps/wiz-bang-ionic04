import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { DataSharingHeader } from "@proclaimer-content/pages/home/data-sharing/data-sharing-header/DataSharingHeader";
import { DataSharingContent } from "@proclaimer-content/pages/home/data-sharing/data-sharing-content/DataSharingContent";

function DataSharingPage() {
  return (
    <IonPage>
      <IonHeader>
        <DataSharingHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <DataSharingContent />
      </IonContent>
    </IonPage>
  );
}

export default DataSharingPage;
