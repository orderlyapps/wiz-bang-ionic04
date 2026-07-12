import { useState } from "react";
import { IonPage, IonHeader, IonContent, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapCheckoutHeader } from "@proclaimer-content/pages/home/service-overseer/map-checkout/map-checkout-header/MapCheckoutHeader";
import { MapCheckoutContent } from "@proclaimer-content/pages/home/service-overseer/map-checkout/map-checkout-content/MapCheckoutContent";

function MapCheckoutPage() {
  const [show_add_alert, set_show_add_alert] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <MapCheckoutHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <MapCheckoutContent
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

export default MapCheckoutPage;
