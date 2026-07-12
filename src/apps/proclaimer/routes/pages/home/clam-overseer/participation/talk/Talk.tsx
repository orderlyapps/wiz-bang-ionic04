import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { TalkHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/talk/talk-header/TalkHeader";
import { TalkContent } from "@proclaimer-content/pages/home/clam-overseer/participation/talk/talk-content/TalkContent";

function TalkPage() {
  return (
    <IonPage>
      <IonHeader>
        <TalkHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <TalkContent />
      </IonContent>
    </IonPage>
  );
}

export default TalkPage;
