import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { DoorToDoorHeader } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-header/DoorToDoorHeader";
import { DoorToDoorContent } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/DoorToDoorContent";
import { MapZoomProvider } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/context";
import { MapSettingsProvider } from "@proclaimer-content/pages/ministry/door-to-door/shared/context/MapSettingsProvider";

function DoorToDoorPage() {
  return (
    <MapSettingsProvider>
      <MapZoomProvider>
        <IonPage>
          <IonHeader>
            <DoorToDoorHeader />
          </IonHeader>
          <IonContent className="content-full" scrollY={false}>
            <DoorToDoorContent />
          </IonContent>
        </IonPage>
      </MapZoomProvider>
    </MapSettingsProvider>
  );
}

export default DoorToDoorPage;
