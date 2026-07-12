import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SpeakerHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/speaker/speaker-header/SpeakerHeader";
import { SpeakerContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/speaker/speaker-content/SpeakerContent";

function SpeakerPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <SpeakerHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <SpeakerContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default SpeakerPage;
