import { MapboxContent } from "@base-content/pages/settings/info/util/vendor/mapbox/mapbox-content/MapboxContent";
import { MapboxHeader } from "@base-content/pages/settings/info/util/vendor/mapbox/mapbox-header/MapboxHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function MapboxPage() {
  return (
    <IonPage>
      <IonHeader>
        <MapboxHeader />
      </IonHeader>
      <IonContent>
        <MapboxContent />
      </IonContent>
    </IonPage>
  );
}

export default MapboxPage;
