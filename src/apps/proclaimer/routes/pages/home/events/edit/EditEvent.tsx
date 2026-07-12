import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { EditEventHeader } from "@proclaimer-content/pages/home/events/edit/edit-header/EditEventHeader";
import { EditEventContent } from "@proclaimer-content/pages/home/events/edit/edit-content/EditEventContent";

function EditEventPage() {
  const { event_id } = useParams<{ event_id?: string }>();

  return (
    <IonPage>
      <IonHeader>
        <EditEventHeader is_new={!event_id} />
      </IonHeader>
      <IonContent className="ion-padding">
        <EditEventContent event_id={event_id} />
      </IonContent>
    </IonPage>
  );
}

export default EditEventPage;
