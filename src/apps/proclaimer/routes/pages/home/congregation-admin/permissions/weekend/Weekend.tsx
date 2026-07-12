import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { WeekendHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/weekend/weekend-header/WeekendHeader";
import { WeekendContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/weekend/weekend-content/WeekendContent";

function WeekendPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <WeekendHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <WeekendContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default WeekendPage;
