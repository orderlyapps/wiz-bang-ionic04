import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { TerritoryServantHeader } from "@proclaimer-content/pages/home/territory-servant/territory-servant-header/TerritoryServantHeader";
import { TerritoryServantContent } from "@proclaimer-content/pages/home/territory-servant/territory-servant-content/TerritoryServantContent";

function TerritoryServantPage() {
  return (
    <IonPage>
      <IonHeader>
        <TerritoryServantHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <TerritoryServantContent />
      </IonContent>
    </IonPage>
  );
}

export default TerritoryServantPage;
