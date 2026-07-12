import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { LocalSpeakersContent } from "@proclaimer-content/pages/home/speaker/local-speakers/local-speakers-content/LocalSpeakersContent";
import { LocalSpeakersHeader } from "@proclaimer-content/pages/home/speaker/local-speakers/local-speakers-header/LocalSpeakersHeader";

function LocalSpeakersPage() {
  return (
    <IonPage>
      <IonHeader>
        <LocalSpeakersHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <LocalSpeakersContent />
      </IonContent>
    </IonPage>
  );
}

export default LocalSpeakersPage;
