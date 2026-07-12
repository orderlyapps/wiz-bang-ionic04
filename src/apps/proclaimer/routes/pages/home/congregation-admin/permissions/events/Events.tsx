import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { EventsHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/events/events-header/EventsHeader";
import { EventsContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/events/events-content/EventsContent";

function EventsPermissionsPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <EventsHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <EventsContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default EventsPermissionsPage;
