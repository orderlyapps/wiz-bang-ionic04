import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherParticipationHeader } from "@proclaimer-content/pages/home/secretary/publishers/publisher-participation/publisher-participation-header/PublisherParticipationHeader";
import { PublisherParticipationContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-participation/publisher-participation-content/PublisherParticipationContent";

function AllPublishersParticipationPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <PublisherParticipationHeader />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <PublisherParticipationContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default AllPublishersParticipationPage;
