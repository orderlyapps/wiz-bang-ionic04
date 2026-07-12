import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CobeHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/cobe/cobe-header/CobeHeader";
import { CobeContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/cobe/cobe-content/CobeContent";

function CobePage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <CobeHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <CobeContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default CobePage;
