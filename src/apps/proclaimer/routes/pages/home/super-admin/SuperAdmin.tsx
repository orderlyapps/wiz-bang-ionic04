import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SuperAdminHeader } from "@proclaimer-content/pages/home/super-admin/super-admin-header/SuperAdminHeader";
import { SuperAdminContent } from "@proclaimer-content/pages/home/super-admin/super-admin-content/SuperAdminContent";

function SuperAdminPage() {
  return (
    <IonPage>
      <IonHeader>
        <SuperAdminHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <SuperAdminContent />
      </IonContent>
    </IonPage>
  );
}

export default SuperAdminPage;
