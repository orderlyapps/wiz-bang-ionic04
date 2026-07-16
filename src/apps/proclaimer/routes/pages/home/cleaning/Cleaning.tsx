import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CleaningHeader } from "@proclaimer-content/pages/home/cleaning/cleaning-header/CleaningHeader";
import { CleaningContent } from "@proclaimer-content/pages/home/cleaning/cleaning-content/CleaningContent";

function CleaningPage() {
  return (
    <IonPage>
      <IonHeader>
        <CleaningHeader />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <CleaningContent />
      </IonContent>
    </IonPage>
  );
}

export default CleaningPage;
