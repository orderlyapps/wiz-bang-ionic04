import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { LocationsHeader } from "@proclaimer-content/pages/publishers/locations/locations-header/LocationsHeader";
import { LocationsContent } from "@proclaimer-content/pages/publishers/locations/locations-content/LocationsContent";

function LocationsPage() {
  const [fly_to_coordinates, set_fly_to_coordinates] = useState<[number, number] | null>(null);

  return (
    <IonPage>
      <IonHeader>
        <LocationsHeader
          on_select_publisher={(publisher) => set_fly_to_coordinates(publisher.coordinates)}
        />
      </IonHeader>
      <IonContent className="content-full" scrollY={false}>
        <LocationsContent
          fly_to_coordinates={fly_to_coordinates}
          on_fly_to_complete={() => set_fly_to_coordinates(null)}
        />
      </IonContent>
    </IonPage>
  );
}

export default LocationsPage;
