import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SecretaryHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/secretary/secretary-header/SecretaryHeader";
import { SecretaryContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/secretary/secretary-content/SecretaryContent";

function SecretaryPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <SecretaryHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <SecretaryContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default SecretaryPage;
