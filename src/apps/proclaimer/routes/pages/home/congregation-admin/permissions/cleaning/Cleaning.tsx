import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CleaningHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/cleaning/cleaning-header/CleaningHeader";
import { CleaningContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/cleaning/cleaning-content/CleaningContent";

function CleaningPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <CleaningHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <CleaningContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default CleaningPage;
