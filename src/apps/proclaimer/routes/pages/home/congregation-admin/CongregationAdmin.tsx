import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CongregationAdminHeader } from "@proclaimer-content/pages/home/congregation-admin/congregation-admin-header/CongregationAdminHeader";
import { CongregationAdminContent } from "@proclaimer-content/pages/home/congregation-admin/congregation-admin-content/CongregationAdminContent";

function CongregationAdminPage() {
  return (
    <IonPage>
      <IonHeader>
        <CongregationAdminHeader />
      </IonHeader>
      <IonContent>
        <CongregationAdminContent />
      </IonContent>
    </IonPage>
  );
}

export default CongregationAdminPage;
