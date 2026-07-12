import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PermissionsHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/permissions-header/PermissionsHeader";
import { PermissionsContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/permissions-content/PermissionsContent";

function PermissionsPage() {
  return (
    <IonPage>
      <IonHeader>
        <PermissionsHeader />
      </IonHeader>
      <IonContent>
        <PermissionsContent />
      </IonContent>
    </IonPage>
  );
}

export default PermissionsPage;
