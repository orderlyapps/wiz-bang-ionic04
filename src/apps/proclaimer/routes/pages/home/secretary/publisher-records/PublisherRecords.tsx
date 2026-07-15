import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublisherRecordsHeader } from "@proclaimer-content/pages/home/secretary/publisher-records/publisher-records-header/PublisherRecordsHeader";
import { PublisherRecordsContent } from "@proclaimer-content/pages/home/secretary/publisher-records/publisher-records-content/PublisherRecordsContent";

function PublisherRecordsPage() {
  return (
    <IonPage>
      <IonHeader>
        <PublisherRecordsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <PublisherRecordsContent />
      </IonContent>
    </IonPage>
  );
}

export default PublisherRecordsPage;
