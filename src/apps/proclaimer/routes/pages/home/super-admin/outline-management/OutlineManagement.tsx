import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { OutlineManagementHeader } from "@proclaimer-content/pages/home/super-admin/outline-management-header/OutlineManagementHeader";
import { OutlineManagementContent } from "@proclaimer-content/pages/home/super-admin/outline-management-content/OutlineManagementContent";

function OutlineManagementPage() {
  return (
    <IonPage>
      <IonHeader>
        <OutlineManagementHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <OutlineManagementContent />
      </IonContent>
    </IonPage>
  );
}

export default OutlineManagementPage;
