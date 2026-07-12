import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CleaningHeader } from "@proclaimer-content/pages/schedules/cleaning/cleaning-header/CleaningHeader";
import { CleaningContent } from "@proclaimer-content/pages/schedules/cleaning/cleaning-content/CleaningContent";

function CleaningPage() {
  return (
    <IonPage>
      <IonHeader>
        <CleaningHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <CleaningContent />
      </IonContent>
    </IonPage>
  );
}

export default CleaningPage;
