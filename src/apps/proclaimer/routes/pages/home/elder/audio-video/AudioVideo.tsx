import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AudioVideoHeader } from "@proclaimer-content/pages/home/elder/pdfs/audio-video/audio-video-header/AudioVideoHeader";
import { AudioVideoContent } from "@proclaimer-content/pages/home/elder/pdfs/audio-video/audio-video-content/AudioVideoContent";

function AudioVideoPage() {
  return (
    <IonPage>
      <IonHeader>
        <AudioVideoHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <AudioVideoContent />
      </IonContent>
    </IonPage>
  );
}

export default AudioVideoPage;
