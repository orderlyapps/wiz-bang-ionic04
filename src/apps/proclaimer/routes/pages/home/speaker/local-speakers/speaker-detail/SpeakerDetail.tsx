import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { SpeakerDetailHeader } from "@proclaimer-content/pages/home/speaker/local-speakers/speaker-detail/speaker-detail-header/SpeakerDetailHeader";
import { SpeakerDetailContent } from "@proclaimer-content/pages/home/speaker/local-speakers/speaker-detail/speaker-detail-content/SpeakerDetailContent";

function LocalSpeakerDetailPage() {
  const { speaker_id } = useParams<{ speaker_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <SpeakerDetailHeader speaker_id={speaker_id} />
      </IonHeader>
      <IonContent className="ion-padding">
        <SpeakerDetailContent speaker_id={speaker_id} />
      </IonContent>
    </IonPage>
  );
}

export default LocalSpeakerDetailPage;
