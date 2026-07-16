import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherAssignmentsHeader } from "@proclaimer-content/pages/home/secretary/publishers/publisher-assignments/publisher-assignments-header/PublisherAssignmentsHeader";
import { PublisherAssignmentsContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-assignments/publisher-assignments-content/PublisherAssignmentsContent";
import { usePublisherName } from "@proclaimer-content/pages/home/elder/reports/publishers/publisher-detail/hooks/usePublisherName";

function AllPublishersAssignmentsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <PublisherAssignmentsHeader
          publisher_name={publisher_name}
          default_href={`/publishers/all/${publisher_id}`}
        />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <PublisherAssignmentsContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default AllPublishersAssignmentsPage;
