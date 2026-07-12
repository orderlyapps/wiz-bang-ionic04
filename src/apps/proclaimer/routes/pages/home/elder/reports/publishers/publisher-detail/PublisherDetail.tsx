import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherDetailHeader } from "@proclaimer-content/pages/home/elder/reports/publishers/publisher-detail/publisher-detail-header/PublisherDetailHeader";
import { PublisherDetailContent } from "@proclaimer-content/pages/home/elder/reports/publishers/publisher-detail/publisher-detail-content/PublisherDetailContent";
import { usePublisherName } from "@proclaimer-content/pages/home/elder/reports/publishers/publisher-detail/hooks/usePublisherName";

function PublisherDetailPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <PublisherDetailHeader publisher_name={publisher_name} />
      </IonHeader>
      <IonContent className="ion-padding">
        <PublisherDetailContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default PublisherDetailPage;
