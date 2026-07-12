import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ServiceOverseerHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/service-overseer/service-overseer-header/ServiceOverseerHeader";
import { ServiceOverseerContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/service-overseer/service-overseer-content/ServiceOverseerContent";

function ServiceOverseerPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <ServiceOverseerHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <ServiceOverseerContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default ServiceOverseerPage;
