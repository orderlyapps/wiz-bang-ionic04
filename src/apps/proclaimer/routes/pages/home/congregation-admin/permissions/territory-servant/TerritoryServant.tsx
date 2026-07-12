import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { TerritoryServantHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/territory-servant/territory-servant-header/TerritoryServantHeader";
import { TerritoryServantContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/territory-servant/territory-servant-content/TerritoryServantContent";

function TerritoryServantPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <TerritoryServantHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <TerritoryServantContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default TerritoryServantPage;
