import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MapsHeader } from "@proclaimer-content/pages/ministry/maps/maps-header/MapsHeader";
import { MapsContent } from "@proclaimer-content/pages/ministry/maps/maps-content/MapsContent";

function MapsPage() {
  return (
    <IonPage>
      <IonHeader>
        <MapsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <MapsContent />
      </IonContent>
    </IonPage>
  );
}

export default MapsPage;
