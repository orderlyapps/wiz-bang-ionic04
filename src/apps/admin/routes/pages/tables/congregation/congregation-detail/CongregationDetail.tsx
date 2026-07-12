import { CongregationDetailContent } from "@admin-content/pages/tables/congregation/congregation-detail/congregation-detail-content/CongregationDetailContent";
import { CongregationDetailHeader } from "@admin-content/pages/tables/congregation/congregation-detail/congregation-detail-header/CongregationDetailHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function CongregationDetailPage() {
  return (
    <IonPage>
      <IonHeader>
        <CongregationDetailHeader />
      </IonHeader>
      <IonContent>
        <CongregationDetailContent />
      </IonContent>
    </IonPage>
  );
}

export default CongregationDetailPage;
