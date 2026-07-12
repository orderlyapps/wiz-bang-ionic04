import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MinisterialServantHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/ministerial-servant/ministerial-servant-header/MinisterialServantHeader";
import { MinisterialServantContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/ministerial-servant/ministerial-servant-content/MinisterialServantContent";

function MinisterialServantPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <MinisterialServantHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <MinisterialServantContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default MinisterialServantPage;
