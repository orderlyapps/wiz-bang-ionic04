import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { AudioVideoHeader } from "@proclaimer-content/pages/home/reminders/audio-video/audio-video-header/AudioVideoHeader";
import { AudioVideoContent } from "@proclaimer-content/pages/home/reminders/audio-video/audio-video-content/AudioVideoContent";

function AudioVideoPage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <AudioVideoHeader />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <AudioVideoContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default AudioVideoPage;
