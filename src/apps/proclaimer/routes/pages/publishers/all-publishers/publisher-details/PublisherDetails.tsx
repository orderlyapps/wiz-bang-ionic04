import { useState } from "react";
import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { AllPublishersDetailsHeader } from "@proclaimer-content/pages/publishers/all-publishers/all-publishers-details/all-publishers-details-header/AllPublishersDetailsHeader";
import { AllPublishersDetailsContent } from "@proclaimer-content/pages/publishers/all-publishers/all-publishers-details/all-publishers-details-content/AllPublishersDetailsContent";

function AllPublishersDetailsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const [read_only, set_read_only] = useState(true);

  return (
    <IonPage>
      <IonHeader>
        <AllPublishersDetailsHeader
          publisher_id={publisher_id}
          read_only={read_only}
          onToggleEdit={() => set_read_only((prev) => !prev)}
        />
      </IonHeader>
      <AllPublishersDetailsContent
        publisher_id={publisher_id}
        read_only={read_only}
        reports_path={`/publishers/all/${publisher_id}/reports`}
        assignments_path={`/publishers/all/${publisher_id}/assignments`}
        participation_path={`/publishers/all/${publisher_id}/participation`}
      />
    </IonPage>
  );
}

export default AllPublishersDetailsPage;
