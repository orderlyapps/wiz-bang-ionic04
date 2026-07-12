import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AvOverseerHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/av-overseer/av-overseer-header/AvOverseerHeader";
import { AvOverseerContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/av-overseer/av-overseer-content/AvOverseerContent";

function AvOverseerPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <AvOverseerHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <AvOverseerContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default AvOverseerPage;
