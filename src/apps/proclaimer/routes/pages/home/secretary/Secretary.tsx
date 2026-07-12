import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SecretaryHeader } from "@proclaimer-content/pages/home/secretary/secretary-header/SecretaryHeader";
import { SecretaryContent } from "@proclaimer-content/pages/home/secretary/secretary-content/SecretaryContent";

function SecretaryPage() {
  return (
    <IonPage>
      <IonHeader>
        <SecretaryHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <SecretaryContent />
      </IonContent>
    </IonPage>
  );
}

export default SecretaryPage;
