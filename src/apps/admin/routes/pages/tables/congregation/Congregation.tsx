import { CongregationHeader } from "@admin-content/pages/tables/congregation/congregation-header/CongregationHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CongregationContent } from "@admin-content/pages/tables/congregation/congregation-content/CongregationContent";

function CongregationPage() {
  return (
    <IonPage>
      <IonHeader>
        <CongregationHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <CongregationContent />
      </IonContent>
    </IonPage>
  );
}

export default CongregationPage;
