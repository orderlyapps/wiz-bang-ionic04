import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ReportsHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/reports/reports-header/ReportsHeader";
import { ReportsContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/reports/reports-content/ReportsContent";

function ReportsPage() {
  return (
    <IonPage>
      <IonHeader>
        <ReportsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ReportsContent />
      </IonContent>
    </IonPage>
  );
}

export default ReportsPage;
