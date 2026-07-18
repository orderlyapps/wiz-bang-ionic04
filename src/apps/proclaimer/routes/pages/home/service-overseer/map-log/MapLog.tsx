import { useState } from "react";
import { IonPage, IonHeader, IonContent, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapLogHeader } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-header/MapLogHeader";
import { MapLogContent } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/MapLogContent";
import { CheckoutModal } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/checkout-modal/CheckoutModal";

function MapLogPage() {
  const [show_checkout, set_show_checkout] = useState(false);
  const [search_term, set_search_term] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <MapLogHeader search_term={search_term} on_search={set_search_term} />
      </IonHeader>
      <IonContent className="content-wide">
        <MapLogContent search_term={search_term} />
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => set_show_checkout(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      <CheckoutModal isOpen={show_checkout} onDidDismiss={() => set_show_checkout(false)} />
    </IonPage>
  );
}

export default MapLogPage;
