import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { WeekendHeader } from "@proclaimer-content/pages/home/weekend/weekend-header/WeekendHeader";
import { WeekendContent } from "@proclaimer-content/pages/home/weekend/weekend-content/WeekendContent";

function WeekendPage() {
  return (
    <IonPage>
      <IonHeader>
        <WeekendHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <WeekendContent />
      </IonContent>
    </IonPage>
  );
}

export default WeekendPage;
