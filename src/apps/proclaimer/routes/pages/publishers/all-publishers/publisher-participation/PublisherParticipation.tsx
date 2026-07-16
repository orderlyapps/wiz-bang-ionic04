import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherDetailHeader } from "@proclaimer-content/pages/home/elder/reports/publishers/publisher-detail/publisher-detail-header/PublisherDetailHeader";
import { PublisherParticipationContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-participation/publisher-participation-content/PublisherParticipationContent";
import { usePublisherName } from "@proclaimer-content/pages/home/elder/reports/publishers/publisher-detail/hooks/usePublisherName";

function AllPublishersParticipationPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <PublisherDetailHeader
          publisher_name={publisher_name}
          publisher_id={publisher_id ?? ""}
          default_href={`/publishers/all/${publisher_id}`}
        />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <PublisherParticipationContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default AllPublishersParticipationPage;
