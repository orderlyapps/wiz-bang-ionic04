import { useState } from "react";
import { IonPage, IonHeader, IonContent, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapTagsHeader } from "@proclaimer-content/pages/home/service-overseer/map-tags/map-tags-header/MapTagsHeader";
import { MapTagsContent } from "@proclaimer-content/pages/home/service-overseer/map-tags/map-tags-content/MapTagsContent";

function MapTagsPage() {
  const [show_add_alert, set_show_add_alert] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <MapTagsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <MapTagsContent
          showAddAlert={show_add_alert}
          onAddAlertDismiss={() => set_show_add_alert(false)}
        />
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => set_show_add_alert(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
}

export default MapTagsPage;
