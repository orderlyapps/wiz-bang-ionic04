import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherRecordHeader } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-record/publisher-record-header/PublisherRecordHeader";
import { PublisherRecordContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-record/publisher-record-content/PublisherRecordContent";
import { usePublisherName } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-record/hooks/usePublisherName";

function PublisherReportsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <PublisherRecordHeader
          publisher_name={publisher_name}
          publisher_id={publisher_id ?? ""}
          default_href={`/home/secretary/publishers/${publisher_id}`}
        />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <PublisherRecordContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default PublisherReportsPage;
