import { useState } from "react";
import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherDetailsHeader } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-header/PublisherDetailsHeader";
import { PublisherDetailsContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-content/PublisherDetailsContent";

function PublisherDetailsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const [read_only, set_read_only] = useState(true);

  return (
    <IonPage>
      <IonHeader>
        <PublisherDetailsHeader
          publisher_id={publisher_id}
          read_only={read_only}
          onToggleEdit={() => set_read_only((prev) => !prev)}
        />
      </IonHeader>
      <PublisherDetailsContent
        publisher_id={publisher_id}
        read_only={read_only}
        reports_path={`/home/secretary/publishers/${publisher_id}/reports`}
        assignments_path={`/home/secretary/publishers/${publisher_id}/assignments`}
        participation_path={`/home/secretary/publishers/${publisher_id}/participation`}
      />
    </IonPage>
  );
}

export default PublisherDetailsPage;
