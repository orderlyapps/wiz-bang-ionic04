import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { AssignmentsHeader } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/assignments/assignments-header/AssignmentsHeader";
import { AssignmentsContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/assignments/assignments-content/AssignmentsContent";
import { usePublisherName } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-record/hooks/usePublisherName";

function AllPublishersAssignmentsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <AssignmentsHeader
          publisher_name={publisher_name}
          default_href={`/publishers/all/${publisher_id}`}
        />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <AssignmentsContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default AllPublishersAssignmentsPage;
