import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublishersHeader } from "@proclaimer-content/pages/home/elder/reports/publishers/publishers-header/PublishersHeader";
import { PublishersContent } from "@proclaimer-content/pages/home/elder/reports/publishers/publishers-content/PublishersContent";

function PublishersPage() {
  return (
    <IonPage>
      <IonHeader>
        <PublishersHeader />
      </IonHeader>
      <IonContent className="ion-padding content-wide">
        <PublishersContent />
      </IonContent>
    </IonPage>
  );
}

export default PublishersPage;
