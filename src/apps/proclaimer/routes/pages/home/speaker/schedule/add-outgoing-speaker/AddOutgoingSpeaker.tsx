import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { AddOutgoingSpeakerHeader } from "@proclaimer-content/pages/home/speaker/schedule/add-outgoing-speaker/add-outgoing-speaker-header/AddOutgoingSpeakerHeader";
import { AddOutgoingSpeakerContent } from "@proclaimer-content/pages/home/speaker/schedule/add-outgoing-speaker/add-outgoing-speaker-content/AddOutgoingSpeakerContent";

function AddOutgoingSpeakerPage() {
  const { week_id } = useParams<{ week_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <AddOutgoingSpeakerHeader back_href={`/home/speaker/schedule/${week_id}`} />
      </IonHeader>
      <IonContent className="content-wide">
        <AddOutgoingSpeakerContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default AddOutgoingSpeakerPage;
